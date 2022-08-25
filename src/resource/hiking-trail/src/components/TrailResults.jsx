import React, {useState} from 'react';

export default function TrailResults() {
    const [results, setResults] = useState ([]);

    return (
        <div>
            <h2>Trail Search Result</h2>
        <div className = "container">
            <img className = "trail-image"></img>
            <section>
                <h4>Snoqualmie</h4>
                <p>Snoqualmie, WA</p>
                <p>1.4 mi</p>

            </section>
        </div>
    </div>
    )

}

 
