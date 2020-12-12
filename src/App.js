import React, {useCallback, useState} from "react";
import {Input, Switch, Divider} from "antd";
import axios from "axios";

import 'antd/dist/antd.css';
import './App.css';
import {Results} from "./components/Results/Results";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:5000/',
});

function App() {
    const [resultsMode, setResultsMode] = useState(true);

    const [search, setSearch] = useState('cats');
    const [results, setResults] = useState([]);
    const [resultsLoading, setResultsLoading] = useState(false);
    const [autocompleteResultsLoading, setAutocompleteResultsLoading] = useState(false);
    const [autocompleteResults, setAutocompleteResults] = useState([]);

    const getResults = useCallback((text) => {
        setResultsLoading(true);

        instance.get('/results/', {params: {text}})
            .then(response => {
                setResults(response.data)
                setResultsLoading(false);
            })
    }, [setResults])

    const getAutocompleteResults = useCallback((text) => {
        setAutocompleteResultsLoading(true);

        instance.get('/autocomplete/', {params: {text}})
            .then(response => {
                setAutocompleteResults(response.data)
                setAutocompleteResultsLoading(false);
            })
    }, [setAutocompleteResults])

    const onPressEnter = useCallback(() => {
        if (resultsMode) {
            getResults(search)

            return;
        }

        getAutocompleteResults(search);
    }, [resultsMode, getAutocompleteResults, search, getResults]);

    return (
        <div className="App">
            <Input
                className="App-Input"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onPressEnter={onPressEnter}
            />
            <div className="App-SwitchLabel">
                <span className="App-SwitchLabel">Autocomplete resuls/Results</span>
                <Switch defaultChecked onChange={() => setResultsMode(!resultsMode)} />
            </div>
            <Divider />
            {
                resultsMode ?
                    <Results results={results} loading={resultsLoading} /> :
                    <Results results={autocompleteResults} loading={autocompleteResultsLoading} />
            }
        </div>
    );
}

export default App;
