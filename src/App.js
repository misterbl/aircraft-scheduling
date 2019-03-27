import React, { Component } from "react";
import "./App.scss";
import AirCraftsList from "./components/AirCraftsList";
import FlightsList from "./components/FlightsList";
import TImeline from "./components/Timeline";
import sortArray from "./sortArray";
import { calculatePercentage } from "./utils";
import { TURNAROUND } from "./const";
import planeGif from "./assets/planeGif.gif";
import infoIcon from "./assets/information.svg";
import Instructions from "./components/Instructions";

class App extends Component {
  state = {
    aircraftList: [],
    flightsList: [],
    selectedFlight: null,
    rotation: [],
    flyingTimesList: [],
    loading: false
  };
  componentDidMount() {
    this.getAircrafts();
  }

  getAircrafts = async () => {
    this.setState({ loading: true });
    try {
      const response = await fetch(
        "https://infinite-dawn-93085.herokuapp.com/aircrafts"
      );
      const json = await response.json();
      const aircraftList = json.data;
      this.setState({ loading: false, aircraftList });
    } catch (e) {
      this.setState({
        fatalError: true
      });
    }
  };

  onSelectAircraft = async () => {
    this.setState({ loading: true });
    try {
      const response = await fetch(
        "https://infinite-dawn-93085.herokuapp.com/flights"
      );
      const json = await response.json();
      const result = json.data;
      const flightsList = await sortArray(result, "origin");
      this.setState({ loading: false, flightsList });
    } catch (e) {
      this.setState({
        fatalError: true
      });
    }
  };

  onSelectFlight = async selectedFlight => {
    this.setState({ loading: true });
    const flyingTime =
      selectedFlight.arrivaltime - selectedFlight.departuretime;
    const timePercentage = await calculatePercentage(flyingTime);
    const updatedSelectedFlight = { ...selectedFlight, timePercentage };
    this.setState({ selectedFlight: updatedSelectedFlight });
    await this.addToRotation();
  };

  getTotalAircraftUse = () =>
    Math.round(
      this.state.rotation.reduce(
        (prev, next) => prev + next.timePercentage,
        0
      ) * 100
    ) / 100;

  addToRotation = async () => {
    const { rotation: rotationState, selectedFlight } = this.state;

    const updatedRotation = rotationState.concat(selectedFlight);
    const rotation = sortArray(updatedRotation, "departuretime");

    const isFlightJourneyEligible = await this.checkFlightJourney(rotation);
    const isFlightTimeEligible = await this.checkFlightTime();
    if (
      rotationState.length === 0 ||
      (rotationState.length > 0 &&
        isFlightTimeEligible &&
        isFlightJourneyEligible)
    ) {
      this.setState({ rotation });
      this.getTotalAircraftUse();
      await this.addTurnAround();
      this.removeFromFlightsList();
      this.setState({ loading: false });
    } else {
      alert(
        "this flight doesn't fit this rotation, choose another flight or remove the conflicting flight(s) from the rotation"
      );
      this.setState({ loading: false });
    }
  };
  removeFromFlightsList = async () => {
    this.setState({ loading: false });
    const { flightsList: flightsListState, selectedFlight } = this.state;
    const flightsList = await flightsListState.filter(flight => {
      return flight.id !== selectedFlight.id;
    });
    this.setState({ flightsList });
  };
  prevFlight = (list, index) => list[index - 1] && list[index - 1];

  nextFlight = (list, index) => list[index + 1] && list[index + 1];

  addToFlyingTimeList = async (list, flight) => {
    const updatedList = await list.concat(flight);
    const resultList = await sortArray(updatedList, "departuretime");
    this.setState({ flyingTimesList: resultList });
    return resultList;
  };

  createTurnaround = (departure, arrival) => {
    const flyingTime = departure - arrival;
    const timePercentage = calculatePercentage(flyingTime);
    const turnaround = {
      departuretime: arrival,
      arrivaltime: departure,
      turnaround: true,
      timePercentage
    };
    this.addToFlyingTimeList(this.state.flyingTimesList, turnaround);
  };

  addTurnAround = async () => {
    const {
      selectedFlight,
      flyingTimesList: flyingTimesListFromState
    } = this.state;
    const { departuretime, arrivaltime } = selectedFlight;
    const flyingTimesList = await this.addToFlyingTimeList(
      flyingTimesListFromState,
      selectedFlight
    );
    const selectedFlightIndex = flyingTimesList.indexOf(selectedFlight);
    const prevFlight = this.prevFlight(flyingTimesList, selectedFlightIndex);
    const nextFlight = this.nextFlight(flyingTimesList, selectedFlightIndex);
    const timeBefore = prevFlight && departuretime - prevFlight.arrivaltime;
    const timeAfter =
      selectedFlight && nextFlight && nextFlight.departuretime - arrivaltime;
    if (timeBefore > 0 && prevFlight) {
      this.createTurnaround(departuretime, prevFlight.arrivaltime);
    }
    if (timeAfter > 0 && nextFlight) {
      this.createTurnaround(nextFlight.departuretime, arrivaltime);
    }
  };

  checkFlightTime = () => {
    const {
      rotation,
      selectedFlight: { departuretime, arrivaltime, origin, destination }
    } = this.state;
    return rotation.reduce((carry, flight) => {
      if (
        (flight.destination === origin &&
          departuretime - flight.arrivaltime >= TURNAROUND) ||
        (destination === flight.origin &&
          flight.departuretime - arrivaltime >= TURNAROUND)
      ) {
        return true;
      }
      return carry;
    }, false);
  };

  checkFlightJourney = rotation => {
    let noConflictWithPrev;
    let noConflictWithNext;
    const { selectedFlight } = this.state;
    const flightIndex = rotation.indexOf(selectedFlight);
    const prevFlight = this.prevFlight(rotation, flightIndex);
    const nextFlight = this.nextFlight(rotation, flightIndex);

    if (!prevFlight) {
      noConflictWithPrev = true;
    }
    if (prevFlight && prevFlight.destination === selectedFlight.origin) {
      noConflictWithPrev = true;
    }
    if (!nextFlight) {
      noConflictWithNext = true;
    }
    if (nextFlight && nextFlight.origin === selectedFlight.destination) {
      noConflictWithNext = true;
    }
    return noConflictWithPrev && noConflictWithNext;
  };

  onRemoveFlight = async selectedFlight => {
    this.setState({ loading: true });
    await this.setState({ selectedFlight });
    await this.removeFromRotation();
    this.removeFromFlyingTime();
  };

  removeFromRotation = async () => {
    const {
      rotation: rotationState,
      flightsList: flightsListState,
      selectedFlight
    } = this.state;
    const rotation = rotationState.filter(
      flight => flight.id !== selectedFlight.id
    );
    const updatedFlightList = flightsListState.concat(selectedFlight);
    const flightsList = await sortArray(updatedFlightList, "origin");
    this.setState({ rotation, flightsList });
  };

  removeFromFlyingTime = () => {
    const {
      flyingTimesList: flyingTimesListState,
      selectedFlight
    } = this.state;
    let flyingTimesList;
    const flightIndex = flyingTimesListState.indexOf(selectedFlight);
    const prevFlight = this.prevFlight(flyingTimesListState, flightIndex);
    const nextFlight = this.nextFlight(flyingTimesListState, flightIndex);
    if (prevFlight && prevFlight.turnaround) {
      this.setState(state => {
        flyingTimesList = state.flyingTimesList.filter(
          flight => flight.id !== prevFlight.id
        );
        this.setState({ loading: false });
        return { flyingTimesList };
      });
    }
    if (nextFlight && nextFlight.turnaround) {
      this.setState(state => {
        flyingTimesList = state.flyingTimesList.filter(
          flight => flight.id !== nextFlight.id
        );
        this.setState({ loading: false });
        return { flyingTimesList };
      });
    }
    this.setState(state => {
      flyingTimesList = state.flyingTimesList.filter(
        flight => flight.id !== state.selectedFlight.id
      );
      this.setState({ loading: false });
      return { flyingTimesList };
    });
  };

  render() {
    const {
      aircraftList,
      flightsList,
      rotation,
      flyingTimesList,
      loading
    } = this.state;

    return (
      <div className="text-center">
        {loading && (
          <img
            className="loading-indicator"
            src={planeGif}
            alt="loading indicator"
          />
        )}
        <div className="d-inline-block">
          <h1 className="mt-15 text-center">Aircraft scheduling</h1>
        </div>
        <div className="info-icon">
          <img src={infoIcon} alt="information icon" />
          <Instructions />
        </div>
        <div className="d-flex mt-35 justify-content-center">
          <AirCraftsList
            totalAircraftUse={this.getTotalAircraftUse}
            aircraftList={aircraftList}
            onSelectAircraft={this.onSelectAircraft}
          />
          <div className="d-flex flex-column">
            <FlightsList
              flightsList={rotation}
              rotation
              onRemoveFlight={this.onRemoveFlight}
            />
            {flyingTimesList.length > 0 && (
              <TImeline flyingTimesList={flyingTimesList} />
            )}
          </div>
          <FlightsList
            flightsList={flightsList}
            onSelectFlight={this.onSelectFlight}
            onRemoveFlight={this.onRemoveFlight}
          />
        </div>
      </div>
    );
  }
}

export default App;
