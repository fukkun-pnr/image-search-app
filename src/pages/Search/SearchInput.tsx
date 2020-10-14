import React from "react";

type Props = {
    word: string;
    changeInput: (word: string) => void;
}

export const SearchInput: React.FC<Props> = (props: Props) => (
    <input className="search-input" data-testid="search-input" placeholder="please search image word" value={props.word} onChange={(e) => props.changeInput(e.target.value)} />
);
