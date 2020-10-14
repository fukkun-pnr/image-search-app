import React from 'react';

import { Indicator } from 'app/src/components/Indicator';
import { useSearch } from "app/src/hooks/search";
import { SearchInput } from "app/src/pages/Search/SearchInput";
import { SearchResult } from "app/src/pages/Search/SearchResult";

export default () => {
    const { loading, word, setWord, searchResult, error } = useSearch();
    return (
        <div className="search-page">
            <form>
                <SearchInput word={word} changeInput={setWord} />
            </form>
            {error && <p role="alert" className="error">{error.message}</p>}
            {searchResult ? <SearchResult photo={searchResult} /> : loading && <Indicator size={100} />}
        </div>
    );
};