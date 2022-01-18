import * as React from "react";
import styled from "styled-components";
import QrReader from "react-qr-reader";

const SQRCodeScannerContainer = styled.div`
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  margin: 0 auto !important;
  background: rgb(0, 0, 0);
`;

const SQRCodeScannerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SCloseButton = styled.div`
  transition: all 0.2s ease-in-out;
  width: 25px;
  height: 25px;
  position: absolute;
  z-index: 10000000;
  top: 15px;
  right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(45deg);
  &:hover {
    opacity: 0.5;
  }
`;

const SFirstLine = styled.div`
  position: absolute;
  width: 90%;
  border: 1px solid rgb(255, 255, 255);
`;

const SSecondLine = styled(SFirstLine)`
  transform: rotate(90deg);
`;


class QRCodeScanner extends React.Component {
  state = {
    delay: 300,
  };

  stopRecording = async () => {
    await this.setState({ delay: false });
  };

  handleScan = (data) => {
    if (data) {
      console.log(data);
      const { result, error } = this.props.onValidate(data);
      if (result) {
        this.stopRecording();
        this.props.onScan(result);
      } else {
        this.handleError(error);
      }
    }
  };

  handleError = (error) => {
    if (error) {
      this.props.onError(error);
    }
  };

  onClose = async () => {
    try {
      await this.stopRecording();
      this.props.onClose();
    } catch (error) {
      this.handleError(error);
    }
  };

  componentWillUnmount() {
    this.stopRecording();
  }
  render() {
    return (
      <SQRCodeScannerContainer>
        <SCloseButton onClick={this.onClose}>
          <SFirstLine />
          <SSecondLine />
        </SCloseButton>
        <SQRCodeScannerWrapper>
          <QrReader
            delay={this.state.delay}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: "100%" }}
          />
        </SQRCodeScannerWrapper>
      </SQRCodeScannerContainer>
    );
  }
}

export default QRCodeScanner;