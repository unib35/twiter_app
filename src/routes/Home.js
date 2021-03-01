import React,{ useState, useEffect } from 'react';
import { dbService } from '../fbase';
import NweetComp from 'components/Nweet'

function Home(props) {
	const [Nweet, setNweet] = useState("");
	const [Nweets, setNweets] = useState([]);
	
	useEffect(() => {
		dbService.collection("Nweets").onSnapshot(snapshot => {
			const NweetArray = snapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data(),
			}))
			setNweets(NweetArray)
		})
	}, [])
	
	const onSubmit = async (e) => {
		e.preventDefault();
		await dbService.collection("Nweets").add({
			text: Nweet,
			createdAt: Date.now(),
			creatorId: props.userObj.uid
		})
		setNweet("");
	}
	
	const onChange = (e) => {
		const {
			target:{value},
		} = e;
		setNweet(value);
	}
	
	return (
		<div>
			<form onSubmit={onSubmit}>
				<input value={Nweet} onChange={onChange} type="text" placeholder="What's on your mind" maxLength={120} />
				<input type="submit" value="Nweet" />
			</form>
			<div>
				{Nweets.map((nweet) => (
					<NweetComp
						key={nweet.id}
						NweetObj={nweet}
						Owner={nweet.creatorId === props.userObj.uid}
					/>
				))}
			</div>
		</div>
	)
}

export default Home