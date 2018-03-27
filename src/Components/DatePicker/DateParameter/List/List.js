import React from 'react';
const dateParameterList = (props) => {
    let reachTocurrent = false;
    const elmList = props.values.map((val,ind) => {
        if (ind === props.current) {
            reachTocurrent = true;
            return (
                <li
                    className="pick-sl"
                    key={val.index}
                    value={val.index}>
                    {val.value}
                </li>
            );
        } else {
            return (
                <li
                    className={reachTocurrent ? "pick-afr" : "pick-bfr"}
                    key={val.index}
                    value={val.index }>
                    {val.value}
                </li>
            )
        }
    });
    if (props.current === 1) {
        elmList[elmList.length - 1] = <li
          className={"pick-afr"}
          key={Math.random()}
          value={elmList[props.values.length - 1].key}>
          {elmList[props.values.length - 1].value}</li>;
      }
    return elmList;   
};
export default dateParameterList;