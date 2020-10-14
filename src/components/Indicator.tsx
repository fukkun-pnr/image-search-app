import React from "react";

type Props = {
    size: number;
}

export const Indicator: React.FC<Props> = React.memo((props: Props) => (
    <div className="indicator" style={{ width: props.size, height: props.size }}>
        <img src={`${process.env.PUBLIC_URL}/img/oval.svg`} alt="indicator" />
    </div>
));