import React,{ useState, useEffect } from 'react';
import { dbService } from '../fbase';
import NweetComp from 'components/Nweet'

function Home(props) {
	const [Nweet, setNweet] = useState("");
	const [Nweets, setNweets] = useState([]);
	const [Attachment, setAttachment] = useState(null);
	
	
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
	
	const onFileChange = (e) => {
		// e.target 은 우리가 파일을 onChange에 넣었기때문에 파알형식 이상
		// 따라서 e.target.files에서 파일을 가져올수있다
		console.log(e.target.files);
		const {
			target:{files},
		} = e;
		//우리가 가진 파일중 첫번째 파일을 가져온다.
		const theFile = files[0];
		//파일을 가지고 리더를 만듬
		const reader = new FileReader();
		//파일로딩이 끝날때 finishedEvent을 받는다.
		//파일을 받아서 텍스트로 변환해준다.
		reader.onloadend = (finishedEvent => {
			console.log(finishedEvent)
			const {
				currentTarget: {result},
			}  = finishedEvent;
			setAttachment(result)
		})
		//readAsDataURL(아주 긴 URL) 을 이용해 파일을 읽는다.
		reader.readAsDataURL(theFile);
		
	}
	
	const onClearPhoto = () => {
		setAttachment(null)
	}
	
	return (
		<div>
			<form onSubmit={onSubmit}>
				<input
					value={Nweet}
					onChange={onChange}
					type="text"
					placeholder="What's on your mind"
					maxLength={120}
				/>
				<input
					type="submit"
					value="Nweet"
				/>
				<br />
				<input
					type="file"
					accept="image/*"
					onChange={onFileChange}
				/>
				{Attachment &&
				<div>
					<img src={Attachment} alt="img" width="50px" height="50px" />
					<br />
					<button onClick={onClearPhoto}>Clear</button>
				</div>
				}
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