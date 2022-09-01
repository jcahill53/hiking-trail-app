import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useParams } from 'react-router-dom';

function CreateMessage() {
    const { id } = useParams();

    const [postMessage, setPostMessage] = useState(null);
    const onFormSubmit = (event) => {
      event.preventDefault();
    
      const trailId = id;
      console.log(id);
      console.log(trailId);
      
      
    //   let postMsgHeader = document.getElementById('post-msg');
      let form = document.getElementById('comment-form');
      if(form.comment.value === ""){
       window.alert("form can't be empty");
      }else{
          setPostMessage(form.comment.value)
      }

    };

    function getFormContent(close) {
    if(postMessage === null){
        return (<div>
        <form id="comment-form">
            <h2 id="post-msg">Post your own message to trail</h2>
            <div id="form-name">
                <label>
                    Name:
                    <input type="text" name="comment" />
                </label>
            </div>
            <div id="form-btns">
                <input id="cancel" className="button" type="button" value="Cancel" onClick={close} />
                <input id="submit" value="Post Message" type="button" onClick={onFormSubmit}  />
            </div>
        </form>
    </div>)
    } else {
        return (<div>
            <h2 id="ty-msg">Thank You! Your Message has been posted to Trail</h2>
            <button onClick={close}>Exit Notification</button>
        </div>)
    }
}


    return (
        <div>
           <p>Create a Trail Comment Page</p>
                <Popup trigger={<button> Post Your Own Message </button>} 
                position="right center">
                    {close => (
                <div className='popup'>
                    {getFormContent(close)}
                </div>
                )}
                </Popup>
        </div>
    )

}

export default CreateMessage