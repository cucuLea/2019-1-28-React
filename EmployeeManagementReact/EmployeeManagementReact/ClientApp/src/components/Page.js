import React, { Component } from 'react';
import '../css/page.css';

export class Page extends Component {

    render(){
        return (
            <div>
                <button className="button" onClick={()=>this.props.prePage()}>PrePage</button>
                <button className="button" onClick={() => this.props.nextPage()}>NextPage</button>
                <span id="pageInfor">{this.props.pageIndex} / {this.props.pageNum}  </span>                
           </div>
        );
    }

}