import React from "react";
import fetch from "node-fetch";
import TableComponent from "./TableComponent";
import Moment from "moment";
import ProfileSvg from "./Icons/Profile";

const styles = {
  NfiCountDiv: (currentStatus) => ({
    height: "13vh",
    backgroundColor: currentStatus === "UND" ? "Blue" : "#b4bec3",
    width: "7%",
    borderRadius: "10px",
    marginRight: "1%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  }),
  DexCountDiv: (currentStatus) => ({
    height: "13vh",
    backgroundColor: currentStatus === "DEX" ? "blue" : "#b4bec3",
    width: "7%",
    borderRadius: "10px",
    marginRight: "1%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  }),
  OodCountDiv: (currentStatus) => ({
    height: "13vh",
    backgroundColor: currentStatus === "OOD" ? "blue" : "#b4bec3",
    width: "7%",
    borderRadius: "10px",
    marginRight: "1%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  }),
  IntCountDiv: (currentStatus) => ({
    height: "13vh",
    backgroundColor: currentStatus === "INT" ? "blue" : "#b4bec3",
    width: "7%",
    borderRadius: "10px",
    marginRight: "1%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  }),
  DeliveryCounterDiv: (currentStatus) => ({
    height: "13vh",
    backgroundColor: currentStatus === "DEL" ? "blue" : "#b4bec3",
    width: "7%",
    borderRadius: "10px",
    marginRight: "1%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  }),
  countParentDiv: {
    display: "flex",
    justifyContent: "center",
    marginTop: "3%",
  },
  delCounterHeaderSpan: {
    fontSize: "0.79rem",
    color: "white",
    marginRight: "30%",
  },
  delCounterValueSpan: {
    fontSize: "1.4rem",
    color: "white",
  },
  countHeaderSpan: {
    fontSize: "0.79rem",
    color: "blue",
    marginRight: "30%",
  },
  counterValueSpan: {
    fontSize: "1.4rem",
    color: "blue",
  },
  actionButtonDiv: {
    border: "1px solid grey",
    height: "45vh",
    width: "25%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "0px 10px 0px 30px",
  },
  tableActionDiv: {
    display: "flex",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: "3%",
  },
  tableDiv: {
    height: "65vh",
    width: "70%",
    overflowX: "auto",
    marginBottom: "4%",
  },
  actionButtonStyle: {
    height: "40px",
    border: "1px solid grey",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  homeActionDiv: {
    backgroundColor: "#dfdfea",
    width: "25%",
    height: "10vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  brandAction: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

class HomePageComponent extends React.Component {
  constructor(props) {
    super();
    this.state = {
      allData: [],
      shipmentData: [],
      deliveredData: [],
      outForDelivery: [],
      arrivedMysoreData: [],
      arrivedBangaloreData: [],
      transitNextHub: [],
      singleShipmentData: "",
      currentStatus: "",
    };
  }

  componentDidMount() {
    this.fetchJsonData();
  }
  fetchJsonData = (value) => {
    console.log(value);
    fetch("https://f0ztti2nsk.execute-api.ap-south-1.amazonaws.com/v1/consignment/fetch", {
      method: "post",
      headers: new Headers({
        Authorization: "Bearer tTU3gFVUdP",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        email: "vkaruna7.kv@gmail.com",
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({ allData: json }, () => {
          if (value === "outForDelivery") {
            var data = this.state.allData.filter((singleData) => singleData.current_status_code === "OOD");
            this.setState({ shipmentData: data, outForDelivery: data, currentStatus: "OOD" });
          } else if (value === "nextHub") {
            var data = this.state.allData.filter((singleData) => singleData.current_status_code === "UND");
            this.setState({ shipmentData: data, transitNextHub: data, currentStatus: "UND" });
          } else if (value === "delivered") {
            var data = this.state.allData.filter((singleData) => singleData.current_status_code === "DEL");
            this.setState({ shipmentData: data, deliveredData: data, currentStatus: "DEL" });
          } else if (value === "Dex") {
            var data = this.state.allData.filter((singleData) => singleData.current_status_code === "DEX");
            this.setState({ shipmentData: data, deliveredData: data, currentStatus: "DEX" });
          } else if (value === "Int") {
            var data = this.state.allData.filter((singleData) => singleData.current_status_code === "INT");
            this.setState({ shipmentData: data, deliveredData: data, currentStatus: "INT" });
          } else {
            var delData = this.state.allData.filter((singleData) => singleData.current_status_code === "DEL");
            var nextHub = this.state.allData.filter((singleData) => singleData.current_status_code === "UND");
            var OODData = this.state.allData.filter((singleData) => singleData.current_status_code === "OOD");
            this.setState({
              outForDelivery: OODData,
              transitNextHub: nextHub,
              deliveredData: delData,
              shipmentData: delData,
              currentStatus: "DEL",
            });
          }
        });
      });
  };

  getSingleShipmentData = (shipmentData) => {
    console.log(shipmentData);
    this.setState({ singleShipmentData: shipmentData });
  };

  render() {
    console.log(Moment("2019-07-15 09:16:53").format("l"));
    console.log(this.state.singleShipmentData);
    return (
      <div>
        <div
          style={{
            borderBottom: "groove",
            display: "flex",
            justifyContent: "space-between",
            height: "10vh",
            alignItems: "center",
          }}
        >
          <div>
            <span>Intugine</span>
          </div>
          <div style={{ display: "flex", width: "30%", justifyContent: "space-around" }}>
            <div style={styles.homeActionDiv}>
              <span>Home</span>
            </div>
            <div style={styles.brandAction}>
              <span>Brands</span>
            </div>
            <div style={styles.brandAction}>
              <span>Transporters</span>
            </div>
            <div style={styles.brandAction}>
              <ProfileSvg />
            </div>
          </div>
        </div>
        <div>
          <div style={styles.countParentDiv}>
            <div
              onClick={() => this.fetchJsonData("delivered")}
              style={styles.DeliveryCounterDiv(this.state.currentStatus)}
            >
              <span
                style={{
                  fontSize: "0.79rem",
                  color: this.state.currentStatus === "DEL" ? "white" : "blue",
                  marginRight: "30%",
                }}
              >
                DEL
              </span>
              <span style={{ fontSize: "1.4rem", color: this.state.currentStatus === "DEL" ? "white" : "blue" }}>
                {this.state.deliveredData.length}
              </span>
            </div>
            <div onClick={() => this.fetchJsonData("Int")} style={styles.IntCountDiv(this.state.currentStatus)}>
              <span
                style={{
                  fontSize: "0.79rem",
                  color: this.state.currentStatus === "INT" ? "white" : "blue",
                  marginRight: "30%",
                }}
              >
                INT
              </span>
              <span style={{ fontSize: "1.4rem", color: this.state.currentStatus === "INT" ? "white" : "blue" }}>
                {this.state.transitNextHub.length}
              </span>
            </div>
            <div
              onClick={() => this.fetchJsonData("outForDelivery")}
              style={styles.OodCountDiv(this.state.currentStatus)}
            >
              <span
                style={{
                  fontSize: "0.79rem",
                  color: this.state.currentStatus === "OOD" ? "white" : "blue",
                  marginRight: "30%",
                }}
              >
                OOD
              </span>
              <span style={{ fontSize: "1.4rem", color: this.state.currentStatus === "OOD" ? "white" : "blue" }}>
                {this.state.outForDelivery.length}
              </span>
            </div>
            <div onClick={() => this.fetchJsonData("Dex")} style={styles.DexCountDiv(this.state.currentStatus)}>
              <span
                style={{
                  fontSize: "0.79rem",
                  color: this.state.currentStatus === "DEX" ? "white" : "blue",
                  marginRight: "30%",
                }}
              >
                DEX
              </span>
              <span style={{ fontSize: "1.4rem", color: this.state.currentStatus === "DEX" ? "white" : "blue" }}>
                {this.state.transitNextHub.length}
              </span>
            </div>
            <div onClick={() => this.fetchJsonData("nextHub")} style={styles.NfiCountDiv(this.state.currentStatus)}>
              <span
                style={{
                  fontSize: "0.79rem",
                  color: this.state.currentStatus === "UND" ? "white" : "blue",
                  marginRight: "30%",
                }}
              >
                NFI
              </span>
              <span style={{ fontSize: "1.4rem", color: this.state.currentStatus === "UND" ? "white" : "blue" }}>
                {this.state.transitNextHub.length}
              </span>
            </div>
          </div>
          <div style={styles.tableActionDiv}>
            {this.state.singleShipmentData !== "" ? (
              <div style={styles.actionButtonDiv}>
                {this.state.singleShipmentData.scan.map((singleData) => (
                  <div style={styles.actionButtonStyle}>
                    <span style={{ fontSize: "0.7rem" }}>{singleData.status_detail}</span>
                    <span style={{ fontSize: "0.7rem" }}>{Moment(singleData.time).format("l")}</span>
                    <span style={{ fontSize: "0.7rem" }}>{singleData.location}</span>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
            <div style={styles.tableDiv}>
              <TableComponent
                getSingleShipmentData={this.getSingleShipmentData}
                shipmentData={this.state.shipmentData}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePageComponent;
