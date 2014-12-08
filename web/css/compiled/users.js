ul.wysihtml5-toolbar {
	margin: 0;
	padding: 0;
	display: block;
}

ul.wysihtml5-toolbar::after {
	clear: both;
	display: table;
	content: "";
}

ul.wysihtml5-toolbar > li {
	float: left;
	display: list-item;
	list-style: none;
	margin: 0 5px 10px 0;
}

ul.wysihtml5-toolbar a[data-wysihtml5-command=bold] {
	font-weight: bold;
}

ul.wysihtml5-toolbar a[data-wysihtml5-command=italic] {
	font-style: italic;
}

ul.wysihtml5-toolbar a[data-wysihtml5-command=underline] {
	text-decoration: underline;
}

ul.wysihtml5-toolbar a.btn.wysihtml5-command-active {
	background-image: none;
	outline: 0;
}

ul.wysihtml5-commands-disabled .dropdown-menu {
	display: none !important;
}

ul.wysihtml5-toolbar div.wysihtml5-colors {
  display:block;
  width: 50px;
  height: 20px;
  margin-top: 2px;
  margin-left: 5px;
  position: absolute;
  pointer-events: none;
}

ul.wysihtml5-toolbar a.wysihtml5-colors-title {
  padding-left: 70px;
}

ul.wysihtml5-toolbar div[data-wysihtml5-command-value="black"] {
  background: black !important;
}

ul.wysihtml5-toolbar div[data-wysihtml5-command-value="silver"] {
  background: silver !important;
}

ul.wysihtml5-toolbar div[data-wysihtml5-command-value="gray"] {
  background: gray !important;
}

ul.wysihtml5-toolbar div[data-wysihtml5-command-value="maroon"] {
  background: maroon !important;
}

ul.wysihtml5-toolbar div[data-wysihtml5-command-value="red"] {
  background: red !important;
}

ul.wysihtml5-toolbar div[data-wysihtml5-command-value="purple"] {
  background: purple !important;
}

ul.wysihtml5-toolbar div[data-wysihtml5-command-value="green"] {
  background: green !important;
}

ul.wysihtml5-toolbar div[data-wysihtml5-command-value="olive"] {
  background: olive !important;
}

ul.wysihtml5-toolbar div[data-wysihtml5-command-value="navy"] {
  background: navy !important;
}

ul.wysihtml5-toolbar div[data-wysihtml5-command-value="blue"] {
  background: blue !important;
}

ul.wysihtml5-toolbar div[data-wysihtml5-command-value="orange"] {
  background: orange !important;
}

/*!
 * Stylesheet for the Date Range Picker, for use with Bootstrap 3.x
 *
 * Copyright 2013 Dan Grossman ( http://www.dangrossman.info )
 * Licensed under the Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Built for http://www.improvely.com
 */

 .daterangepicker.dropdown-menu {
  max-width: none;
  z-index: 3000;
}

.daterangepicker.opensleft .ranges, .daterangepicker.opensleft .calendar {
  float: left;
  margin: 4px;
}

.daterangepicker.opensright .ranges, .daterangepicker.opensright .calendar {
  float: right;
  margin: 4px;
}

.daterangepicker.single .ranges, .daterangepicker.single .calendar {
  float: none;
}

.daterangepicker .ranges {
  width: 160px;
  text-align: left;
}

.daterangepicker .ranges .range_inputs>div {
  float: left;
}

.daterangepicker .ranges .range_inputs>div:nth-child(2) {
  padding-left: 11px;
}

.daterangepicker .calendar {
  display: none;
  max-width: 270px;
}

.daterangepicker.show-calendar .calendar {
    display: block;
}

.daterangepicker .calendar.single .calendar-date {
  border: none;
}

.daterangepicker .calendar th, .daterangepicker .calendar td {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  white-space: nowrap;
  text-align: center;
  min-width: 32px;
}

.daterangepicker .daterangepicker_start_input label,
.daterangepicker .daterangepicker_end_input label {
  color: #333;
  display: block;
  font-size: 11px;
  font-weight: normal;
  height: 20px;
  line-height: 20px;
  margin-bottom: 2px;
  text-shadow: #fff 1px 1px 0px;
  text-transform: uppercase;
  width: 74px;
}

.daterangepicker .ranges input {
  font-size: 11px;
}

.daterangepicker .ranges .input-mini {
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #555;
  display: block;
  font-size: 11px;
  height: 30px;
  line-height: 30px;
  vertical-align: middle;
  margin: 0 0 10px 0;
  padding: 0 6px;
  width: 74px;
}

.daterangepicker .ranges ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.daterangepicker .ranges li {
  font-size: 13px;
  background: #f5f5f5;
  border: 1px solid #f5f5f5;
  color: #465166;
  padding: 3px 12px;
  margin-bottom: 8px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.daterangepicker .ranges li.active, .daterangepicker .ranges li:hover {
  background: #465166;
  color: #fff;
}

.daterangepicker .calendar-date {
  border: 1px solid #ddd;
  padding: 4px;
  border-radius: 4px;
  background: #fff;
}

.daterangepicker .calendar-time {
  text-align: center;
  margin: 8px auto 0 auto;
  line-height: 30px;
}

.daterangepicker {
  position: absolute;
  background: #fff;
  top: 100px;
  left: 20px;
  padding: 4px;
  margin-top: 1px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
}

.daterangepicker.opensleft:before {
  position: absolute;
  top: -7px;
  right: 9px;
  display: inline-block;
  border-right: 7px solid transparent;
  border-bottom: 7px solid #ccc;
  border-left: 7px solid transparent;
  border-bottom-color: rgba(0, 0, 0, 0.2);
  content: '';
}

.daterangepicker.opensleft:after {
  position: absolute;
  top: -6px;
  right: 10px;
  display: inline-block;
  border-right: 6px solid transparent;
  border-bottom: 6px solid #fff;
  border-left: 6px solid transparent;
  content: '';
}

.daterangepicker.opensright:before {
  position: absolute;
  top: -7px;
  left: 9px;
  display: inline-block;
  border-right: 7px solid transparent;
  border-bottom: 7px solid #ccc;
  border-left: 7px solid transparent;
  border-bottom-color: rgba(0, 0, 0, 0.2);
  content: '';
}

.daterangepicker.opensright:after {
  position: absolute;
  top: -6px;
  left: 10px;
  display: inline-block;
  border-right: 6px solid transparent;
  border-bottom: 6px solid #fff;
  border-left: 6px solid transparent;
  content: '';
}

.daterangepicker table {
  width: 100%;
  margin: 0;
}

.daterangepicker td, .daterangepicker th {
  text-align: center;
  width: 20px;
  height: 20px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
}

.daterangepicker td.off {
  color: #999;
}

.daterangepicker td.disabled {
  color: #999;
}

.daterangepicker td.available:hover, .daterangepicker th.available:hover {
  background: #eee;
}

.daterangepicker td.in-range {
  background: #ebf4f8;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
}

.daterangepicker td.start-date {
  -webkit-border-radius: 4px 0 0 4px;
  -moz-border-radius: 4px 0 0 4px;
  border-radius: 4px 0 0 4px;
}

.daterangepicker td.end-date {
  -webkit-border-radius: 0 4px 4px 0;
  -moz-border-radius: 0 4px 4px 0;
  border-radius: 0 4px 4px 0;
}

.daterangepicker td.start-date.end-date {
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
}

.daterangepicker td.active, .daterangepicker td.active:hover {
  background-color: #357ebd;
  border-color: #3071a9;
  color: #fff;
}

.daterangepicker td.week, .daterangepicker th.week {
  font-size: 80%;
  color: #ccc;
}

.daterangepicker select.monthselect, .daterangepicker select.yearselect {
  font-size: 12px;
  padding: 1px;
  height: auto;
  margin: 0;
  cursor: default;
}

.daterangepicker select.monthselect {
  margin-right: 2%;
  width: 56%;
}

.daterangepicker select.yearselect {
  width: 40%;
}

.daterangepicker select.hourselect, .daterangepicker select.minuteselect, .daterangepicker select.ampmselect {
  width: 50px;
  margin-bottom: 0;
}

.daterangepicker_start_input {
  float: left;
}

.daterangepicker_end_input {
  float: left; 
  padding-left: 11px
}

.daterangepicker th.month {
  width: auto;
}
.user-name {
  color: #63a5e1;
}

.userList-item .user-info {
  display: inline-block;
  font-size: 10px;
  line-height: 23px;
  padding-left: 20px;
  vertical-align: top;
}

#user-list .close {
  font-size:26px;
}

#user-list .destroy {
  position: absolute;
  top: 30px;
  right: 30px;
  z-index: 1;
  cursor: pointer;
}

#user-list .view {
  cursor: pointer;
}

#user-list .list-group-item {
  border: none;
  border-radius: 0;
}

#user-list .active {
  background: none repeat scroll 0 0 #579ad7;
  color: white !important;
}

#addUserButton {
  float:right;
  display:none;
}

.userListInput {
  display: inline-block;
  margin-bottom: 8px;
  padding: 5px;
  width: 49%;
}

.userListInput label {
  font-weight: lighter;
}

#user-editor .btn-group {
  display: block;
}

#user-editor .dropdown-menu.dropdown-select {
  margin-top: 32px;
  width: 100%;
}

#user-editor .btn-group button {
  text-align: left;
  width: 100%;
}

#user-editor .caret {
  float: right;
  margin-top: 6px;
}

.dropdown-label {
  display: block;
  margin-right: 9px;
  overflow: hidden;
}

#user-editor .avatarInput {
  float:left;
  margin-bottom: 0;
}

#userListCounter {
  margin-left: 20px;
  margin-right: 35px;
}

#sortMenu {
    margin: 0;
}

#sortMenu .dropdown-menu > li,
#sortConversationMenu .dropdown-menu > li {
  padding: 5px 15px;
  cursor: pointer;
}

#sortMenu .dropdown-menu > li:hover,
#sortMenu .dropdown-menu > li:focus,
#sortMenu .dropdown-menu > .active,
#sortMenu .dropdown-menu > .active:hover,
#sortMenu .dropdown-menu > .active:focus,
#sortConversationMenu .dropdown-menu > li:hover,
#sortConversationMenu .dropdown-menu > li:focus,
#sortConversationMenu .dropdown-menu > .active,
#sortConversationMenu .dropdown-menu > .active:hover,
#sortConversationMenu .dropdown-menu > .active:focus {
  background-color: #4c5566;
  background-image: none;
  color: #fff;
  filter: none;
}

#user-editor .dropdown-menu > li > a:hover,
#user-editor .dropdown-menu > .active > a:hover {
  background-color: #6A7281;
}

#user-editor .dropdown-menu > li.active > a:hover {
  background-color: #566277;
}

@media (min-width: 768px) {
  #user-detail {
    width: 33%;
  }
}

@media (min-width: 530px) {
  #userListCounter {
    float: right;
  }

  #userListCounter.limitReached {
    color: white;
  }
}

@media (max-width: 530px) {
  #userListCounter {
    text-align: right;
  }
}


#user-editor iframe#avatarWidget {
  border:none;
  width: 100%;
  max-width: 119px;
  height: 119px;
  margin-top: 4px;
  position: relative;
  z-index: 15000;
}

.modal-content {
  border-radius: 3px;
}

.modal-footer {
  border-top: none;
  padding: 15px;
  margin-top: 0 !important;
}

.modal-remove {
  margin: 0;
  position: absolute;
  width: 500px;
  height: 400px;
  top: calc(50% - 100px) !important;
  left: calc(50% - 250px) !important;
}

#user-editor .form-errors {
  list-style: none;
  padding: 0;
  color: #fb6b5b;
  font-size: 10px;
}

.userListInput.rights {
   width: 100%;
}

/*********************
FONTS
*********************/

@import url("http://fonts.googleapis.com/css?family=Open+Sans: 200,400,300,600");
@import url(http://fonts.googleapis.com/css?family=Roboto:300,100);

@font-face {
	font-family: 'lily';

	src:url('../../../font/api/lily.eot');
	src:url('../../../font/api/lily.eot') format('embedded-opentype'),
		url('../../../font/api/lily.woff') format('woff'),
		url('../../../font/api/lily.ttf') format('truetype'),
		url('../../../font/api/lily.svg') format('svg');
	font-weight: normal;
	font-style: normal;
}

.lily-icon {
	font-family: 'lily';
	speak: none;
	font-style: normal;
	font-weight: normal;
	font-variant: normal;
	text-transform: none;
	line-height: 1;
	
	/* Better Font Rendering =========== */
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

/*Avatar icons*/
.lily-icon-search:before {
	content: "\e601";
	display: inline-block;
	height: 40px;
	vertical-align: middle;
	line-height: 55px;
	text-align: center;
	font-size: 22px;
}
.lily-icon-parameters:before {
	content: "\e603";
}
.lily-icon-reduce:before {
	content: "\e604";
	width: 40px;
	height: 40px;
	display: inline-block;
	text-align: center;
	line-height: 40px;
	vertical-align: middle;
	font-size: 3px;
}
.lily-icon-avatar:before {
	content: "\e609";
	font-size: 16px;
	line-height: 45px;
}
.lily-icon-mail:before {
	content: "\e606";
	font-size: 12px;
}
.lily-icon-phone:before {
	content: "\e602";
	font-size: 18px;
}
.lily-icon-smartphone:before {
	content: "\f10b";
	font-size: 28px;
}
.lily-icon-mail-alt:before {
	content: "\e606";
	font-size: 12px;
}
.lily-icon-conversation:before {
	content: "\e608";
	font-size: 12px;
}
.lily-icon-menu:before {
	content: "\e605";
	width: 40px;
	height: 40px;
	display: inline-block;
	text-align: center;
	line-height: 45px;
	vertical-align: middle;
	font-size: 16px;
}
.lily-icon-chat:before {
	content: "\e608";
	line-height: 45px;
	font-size: 14px;
}
.lily-icon-faq:before {
	content: "\e607";
	font-size: 18px;
}
.lily-icon-favorite:before {
	content: "\e600";
	font-size: 16px;
}
.lily-icon-home:before {
	content: "\e607";
	font-size: 21px;
}
.lily-icon-arrow-right:before {
	content: "\e60a";
	font-size: 12px;
	line-height: 52px;
}
.lily-icon-arrow-left:before {
	content: "\e60b";
	font-size: 10px;
}
.lily-icon-thumb-down:before {
	content: "\e60e";
	font-size: 18px;
}
.lily-icon-thumb-up:before {
	content: "\e60d";
	font-size: 18px;
}

/*Back-office icons*/
.lily-icon-spam:before {
	content: "\e60f";
	font-size: 14px;
}
.lily-icon-trash:before {
	content: "\e610";
	font-size: 14px;
}
.lily-icon-folder:before {
	content: "\e611";
	font-size: 14px;
}
.lily-icon-label:before {
	content: "\e612";
	font-size: 14px;
}
.lily-icon-browse-next:before {
	content: "\e613";
	font-size: 14px;
}
.lily-icon-browse-previous:before {
	content: "\e614";
	font-size: 14px;
}
.lily-icon-arrow-up:before {
	content: "\e615";
	font-size: 14px;
}
.lily-icon-arrow-down:before {
	content: "\e616";
	font-size: 14px;
}
.lily-icon-label-full:before {
	content: "\e61c";
	font-size: 14px;
}

.lily-icon-tag-star-full:before {
	content: "\e61e";
	font-size: 14px;
}
.lily-icon-tag-star-empty:before {
	content: "\e61d";
	font-size: 14px;
}
.lily-icon-tag-ribbon-full:before {
	content: "\e621";
	font-size: 14px;
}
.lily-icon-tag-ribbon-empty:before {
	content: "\e620";
	font-size: 14px;
}