import React, { Component } from 'react';
import './App.css';
import  a1 from './imgs/a1.png';
import  a2 from './imgs/a2.png';
import  a3 from './imgs/a3.png';
import  a4 from './imgs/a4.png';

class Square extends React.Component{
	
	render(){
		const colors=["#ffffff","#D81803","#F7740D","#75D74D","#10A8FF"]
		const color=colors[this.props.color];
		
		return(
			<div className="square" style={{height:this.props.height,width:this.props.width,background:color}}></div>
		)
	}
}

class SquareRow extends React.Component{
	render(){
		const rows=[];
		for(let i=0;i<this.props.numCol;i++){
			rows.push(
				(<Square key={i} height={this.props.height} width={this.props.width} color={this.props.colors[i]} ></Square>)
			)
		}
		return(
			<div className="square-row" >
				{rows}
			</div>
		)
	}
}

class Table extends React.Component{
	
	render(){
		const tables=[];
		for(let i=0;i<this.props.numRow;i++){
			tables.push(
				(<SquareRow key={i} numCol={this.props.numCol} height={this.props.height} width={this.props.width} colors={this.props.colors[i]}></SquareRow>)
			)
		}
		return(
			<div style={{marginLeft:this.props.marginleft,marginTop:this.props.height/2}}>
				{tables}
			</div>
		)
	}
}

class Portrait extends React.Component{
	
	render(){
		const lis=[];
		for(let i=this.props.numRow;i>=0;i--){
			lis.push(
				(<li className="portrait-li" key={i} style={{height:this.props.height,width:this.props.width,lineHeight:this.props.height+"px"}}>{this.props.num[i]}</li>)
			)
		}
		return(
			<div className="portrait">
				{lis}
			</div>
		)
	}
}

class Transverse extends React.Component{
	render(){
		const lis=[];
		for(let i=0;i<this.props.numCol;i++){
			if(i%2===0){
				lis.push(
					(<li className="Transverse-li" key={i} style={{height:this.props.height,width:this.props.width}}></li>)
				)
			}else{
				lis.push(
					(<li className="Transverse-li" key={i} style={{height:this.props.height,width:this.props.width}} onClick={()=>this.props.onClick(i)}>
						<img className="Transverse-img" src={this.props.imgs[(i-1)/2]} alt="图标"/>
					</li>)
				)
			}
		}
		return(
			<div style={{marginLeft:this.props.marginleft}}>
				{lis}
			</div>
		)
	}
}


class App extends Component {
	
	constructor(props){
		super(props);
		this.state={
			colors:this.createArray(this.props.numRow,this.props.numCol),
		}
		
	}
	
	createArray(row,col){
		let arr=[];
		for(let i=0;i<row;i++){
			let innerArr=[];
			for(let j=0;j<col;j++){
				innerArr.push(0);
			}
			arr.push(innerArr);
		}
		return arr;
	}
	
	handleClick(i){
		let fillNum=[4,11,7,5];
		let fillColor=[1,2,3,4];
		
		let newColors=this.state.colors.slice();
	
		let row=this.props.numRow-fillNum[(i-1)/2];
		let that=this;
		(function aa(){
			newColors[row][i]=fillColor[(i-1)/2];
			if(row<that.props.numRow-1){
				setTimeout(aa,100);
			}
			that.setState({
				colors:newColors
			})
			row++;
		})()
	}

	render() {
	  	
	  	const frameH=768;
	  	const frameW=1024;
	  	const colors=this.state.colors;
	  	
	  	const totalH=frameH;
	  	const totalW=frameW;
	  	const numRow=this.props.numRow;
	  	const numCol=this.props.numCol;
	  	
	  	const w=totalW/(numCol+1);
	  	const h=(2*totalH-2*w)/(1+2*numRow);
	  	
	  	const imgs=[a1,a2,a3,a4];
	    return (
		    <div className="App">
		      	<div className="frame" style={{width:frameW,height:frameH,padding:"10px"}}>
		        	<Portrait num={["周一","周二","周三",3,4,5,6,7,8,9,10,11,12]} numRow={numRow} height={h} width={w/2}/>
		        	<Table marginleft={w/2} numCol={numCol} numRow={numRow} height={h} width={w} colors={colors}/>
		        	<Transverse height={w} width={w} numCol={numCol} imgs={imgs} marginleft={w/2} onClick={(i)=>this.handleClick(i)}/>
		        </div>
		    </div>
	    );
	}
}
/*<Transverse height={"80px"} width={"80px"} imgs={imgs}/>*/
/*<Portrait num={[0,1,2,3,4,5,6,7,8,9,10]} height={h}/>*/

export default App;
