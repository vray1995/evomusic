import React from 'react';
import PropTypes from 'prop-types';
import EmptyContainer from './Container/EmptyContainer';
import Container from './Container/Container';

class CoverFlow extends React.Component {
  state = {
    selectedIndex: 0,
    prevIndex: 0
  };
  selectItem = (index) => {
    console.log(index);
    this.setState((prevState) => ({
      selectedIndex: index,
      prevIndex: prevState.selectedIndex
    }));
    if (this.props.handleSelect) {
      this.props.handleSelect(index);
    }
  };

  componentWillMount() {
    setTimeout(() => {
      const nextSlide = setInterval(() => {
        const nextElem = this.state.selectedIndex + 1 < this.props.imagesArr.length ? this.state.selectedIndex + 1 : this.props.imagesArr.length - 1;
        if(this.props.sourceArr[nextElem].found ){
          this.selectItem(nextElem);
            this.props.completeFind(this.props.labelsArr[nextElem]);
          clearInterval(nextSlide);
        }
        else{
          this.selectItem(nextElem);
        }
      }, 500);
    }, 1000);
  }
  componentWillReceiveProps(nextProps){
    // if(nextProps.imagesArr.length !== this.props.imagesArr.length){
    //   this.setState({selectedIndex: 0});
    // }
  }
  render() {
    let width, height;
    if (this.props.direction === 'vertical') {
      width = isNaN(this.props.width) ? 250 : this.props.width;
      height = isNaN(this.props.height) ? document.body.offsetHeight : this.props.height;
    } else {
      height = isNaN(this.props.height) ? 250 : this.props.height;
      width = isNaN(this.props.width) ? document.body.offsetWidth : this.props.width;
    }

    let styles = {
      textAlign: 'center',
      perspective: '400px',
      margin: '0px',
      position: 'relative',
      height: `${height}px`,
      width: `${width}px`,
      display: 'inline-block',
      boxSizing: 'border-box',
      padding: '25px',
      outline: 'transparent',
      background: this.props.background,
      border: this.props.border,
      boxShadow: this.props.boxShadow
    };

    if (this.props.imagesArr.length === 0) {
      return <EmptyContainer
          containerStyles={styles}
          emptyMessage={this.props.emptyMessage}
          height={this.props.height}
          width={this.props.width}
          background={this.props.background}
          border={this.props.border}
          boxShadow={this.props.boxShadow}/>;
    }
    return <Container
        selectedIndex={this.state.selectedIndex}
        selectItem={this.selectItem}
        containerStyles={styles}
        imagesArr={this.props.imagesArr}
        labelsArr={this.props.labelsArr}
        itemRatio={this.props.itemRatio}
        zIndex={this.props.zIndex}
        handleSelect={this.props.handleSelect}
        height={height}
        width={width}
        background={this.props.background}
        border={this.props.border}
        boxShadow={this.props.boxShadow}
        direction={this.props.direction}/>;
  }
}

CoverFlow.propTypes = {
  imagesArr: PropTypes.array.isRequired,
  zIndex: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
  background: PropTypes.string,
  border: PropTypes.string,
  boxShadow: PropTypes.string,
  emptyMessage: PropTypes.string,
  itemRatio: PropTypes.string,
  handleSelect: PropTypes.func,
  labelsArr: PropTypes.array
};

CoverFlow.defaultProps = {
  zIndex: 100,
  direction: 'horizontal',
  background: '#333333',
  border: 'none',
  boxShadow: 'none',
  emptyMessage: 'No items to show.',
  itemRatio: '8:5',
  labelsArr: []
};

export default CoverFlow;