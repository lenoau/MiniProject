import React from 'react'

export default function CommentTime(date) {

	const seconds = 1;
	const minute = seconds * 60;
	const hour = minute * 60;
	const day = hour * 24;
	
	let today = new Date();
	let Time = Math.trunc((today.getTime() - date.getTime()) / 1000);
	
	let CommentTime = "";
	if (Time < seconds) {
		CommentTime = "방금 전";
	} else if (Time < minute) {
		CommentTime = Time + "초 전";
	} else if (Time < hour) {
		CommentTime = Math.trunc(Time / minute) + "분 전";
	} else if (Time < day) {
		CommentTime = Math.trunc(Time / hour) + "시간 전";
	} else if (Time < (day * 7)) {
		CommentTime = Math.trunc(Time / day) + "일 전";
	} else {
		CommentTime = Math.trunc(date, "yyyy.MM.dd");
	}
	
	return CommentTime;
}
