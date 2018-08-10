import React from '../../../../../../../../Library/Caches/typescript/2.9/node_modules/@types/react';
import FAVideo from '../../../../../../../../Library/Caches/typescript/2.9/node_modules/@types/react-icons/lib/fa/video-camera'
import FAUserPlus from '../../../../../../../../Library/Caches/typescript/2.9/node_modules/@types/react-icons/lib/fa/user-plus'
import MdEllipsisMenu from '../../../../../../../../Library/Caches/typescript/2.9/node_modules/@types/react-icons/lib/md/keyboard-control'

export default function({name, numberOfUsers}) {
	
	return (
		<div className="chat-header">
			<div className="user-info">
				<div className="user-name">{name}</div>
				<div className="status">
					<div className="indicator"></div>
					<span>{numberOfUsers ? numberOfUsers : null}</span>
				</div>
			</div>
			<div className="options">
				<FAVideo />
				<FAUserPlus />
				<MdEllipsisMenu />
			</div>
		</div>
	);
	
}
