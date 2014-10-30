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