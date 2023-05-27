import React from "react";

export default function ProgressBar({filled, total}){
    const fillRatio = filled / total;
    const widthPercent = Math.min(Math.round( fillRatio * 100), 100);
    const widthPercentStyle = `${widthPercent}%`;
    var progressColor = "#04AA6D";
    if(Math.abs(fillRatio - 1) > 0.5){
        progressColor = "red";
    }else if(Math.abs(fillRatio - 1) > 0.1){
        progressColor = "yellow";
    }

    return(
        <div className="progress-bar-container">
            <div className="text-medium position-absolute">{filled} / {total.toPrecision(4)} calories</div>
            <div className="progress-bar-progress" style={{'width' : widthPercentStyle, 'background-color':progressColor}}></div>
        </div>
    );
}