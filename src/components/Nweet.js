import React, { useState } from 'react';
import { dbService } from 'fbase'

function NweetComp({NweetObj, Owner}) {
	
	//Edit mode 인지 아닌지를 위한 state
	const [Edit, setEdit] = useState(false);
	const [NewNweet, setNewNweet] = useState(NweetObj.text);
	
	const onDelete = async () => {
		const ok = window.confirm("Are you sure you want to delete?");
		console.log(ok)
		if(ok) {
			//delete
			await dbService.doc(`Nweets/${NweetObj.id}`).delete();
		}
	}
	
	const toggleEditing = () => {
		setEdit(prev => !prev)
	}
	const onSubmit = async (e) => {
		e.preventDefault();
		console.log(NweetObj, NewNweet)
		await dbService.doc(`Nweets/${NweetObj.id}`).update({
			text:NewNweet
		})
		setEdit(false)
	}
	const onChange = (e) => {
		const {
			target: {value},
		} = e;
		setNewNweet(value);
	}
	
	return(
		<div>
			{
				Edit ? (
					<>
					<form onSubmit={onSubmit}>
						<input
							type="text"
							placeholder="Edit Your nweet"
							value={NewNweet}
							onChange={onChange}
							required
						/>
						<input 
							type="submit"
							value="Update Nweet"
						/>
					</form>
					<button onClick={toggleEditing}>Cancel</button>
					</>
				) : (
				<>
					<h4>{NweetObj.text}</h4>
					{NweetObj.AttachmentURL &&
						<>
						<img 
							src={NweetObj.AttachmentURL}
							alt="img"
							width="80px"
							height="50px"
						/>
						<br />
						</>
					}
					{Owner && (
						<>
						<button onClick={onDelete}>Delete Nweet</button>
						<button onClick={toggleEditing}>Edit Nweet</button> 
						</>
					 )}
				</>
				)
			}
		</div>
	)
}

export default NweetComp