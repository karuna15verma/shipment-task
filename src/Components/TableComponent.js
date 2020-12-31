import React from "react";
import Moment from "moment";

const styles = {
  tableStyle: {
    borderCollapse: "collapse",
    width: "100%",
  },
  tableHeaderStyle: {
    border: "1px solid #dddddd",
    textAlign: "left",
    padding: "8px",
    fontSize: "0.8rem",
  },
  deliveredTableValueStyle: {
    border: "1px solid #dddddd",
    textAlign: "left",
    padding: "8px",
    color: "green",
  },
};

class TableComponent extends React.Component {
  render() {
    return (
      <table style={styles.tableStyle}>
        <tr>
          <th style={styles.tableHeaderStyle}>AWB NUMBER</th>
          <th style={styles.tableHeaderStyle}>TRANSPORTER</th>
          <th style={styles.tableHeaderStyle}>SOURCE</th>
          <th style={styles.tableHeaderStyle}>DESTINATION</th>
          <th style={styles.tableHeaderStyle}>BRAND</th>
          <th style={styles.tableHeaderStyle}>START DATE</th>
          <th style={styles.tableHeaderStyle}>ETD</th>
          <th style={styles.tableHeaderStyle}>STATUS</th>
        </tr>
        {this.props.shipmentData.length === 0 ? (
          <div>
            <span style={{ color: "blue" }}>No Data Found</span>
          </div>
        ) : (
          this.props.shipmentData.map((singleShipmentData) => (
            <tr onClick={() => this.props.getSingleShipmentData(singleShipmentData)}>
              <td style={styles.tableHeaderStyle}>{singleShipmentData.awbno}</td>
              <td style={styles.tableHeaderStyle}>{singleShipmentData.carrier}</td>
              <td style={styles.tableHeaderStyle}>{singleShipmentData.from}</td>
              <td style={styles.tableHeaderStyle}>{singleShipmentData.to}</td>
              <td style={styles.tableHeaderStyle}>-</td>
              <td style={styles.tableHeaderStyle}>{Moment(singleShipmentData.pickup_date).format("l")}</td>
              <td style={styles.tableHeaderStyle}>
                {Moment(singleShipmentData.extra_fields.expected_delivery_date).format("l")}
              </td>
              <td style={styles.deliveredTableValueStyle}>{singleShipmentData.current_status}</td>
            </tr>
          ))
        )}
      </table>
    );
  }
}

export default TableComponent;
