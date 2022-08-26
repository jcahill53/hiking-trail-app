import React, {useEffect, useState} from 'react';
// import { getTrailsByName } from '../../../../../datainterface/hikingtrails';

export default function TrailResults() {
    const [results, setResults] = useState ([]);


    // useEffect(() => {
    //     getDocs(
    //         collection(db, 'userEntry')
    //     ).then(
    //         snapshot => {
    //           console.log(snapshot)
    //             snapshot.forEach(doc => {
    //               setEntries(doc.data());
    //                 console.log(doc.id, doc.data())
    //             });
               
    //             setLoading(false);
    //         },
    //         reason => {
    //             setError(true);
    //             setLoading(false);
    //         }
    //     );
    // }, []);

    

    // useEffect(() => {
    //     getTrailsByName.then(snapshot => {
    //         console.log(snapshot);
    //     })
    // }, [])
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

 
