//Parent component for NewBookForm.js and BookList.js

import React from "react";
import NewBookForm from "./NewBookForm";
import BookList from './BookList';
import BookDetail from './BookDetail';
import EditBookForm from './EditBookForm';
// import { NonceProvider } from "react-select";


class BookControl extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			formVisibleOnPage: false, //new book form
			mainBookList: [],
			selectedBook: null,
			editing: false,
			quantity: 0// form for editing ticket
		};
		this.handleShowForm = this.handleShowForm.bind(this);
	}
	handleShowForm = () => {
		 if(this.state.selectedBook === null) {
			this.setState((prevState) => ({
				formVisibleOnPage : !prevState.formVisibleOnPage,
			}));
		 } else {
			this.setState({
				formVisibleOnPage: false,
				selectedBook: null,
				editing: false
			});
		 }
	}
		//Create// add new coffee sack to list
		handleAddingNewBookToList = (newBook) => {
			const newMainBookList = this.state.mainBookList.concat(newBook);
			this.setState({
				mainBookList: newMainBookList,
			formVisibleOnPage: false
			});
		}
//DELETE

handleDeletingBook = (id) => {
	const newMainBookList = this.state.mainBookList.filter(book => book.id !== id);
	this.setState({
		mainBookList: newMainBookList,
		selectedBook: null
	});
};

//Edit/Sell


		//below- changing inventory of selected coffee sack//
		handleChangingSelectedBook = (id) => {
			const selectedBook = this.state.mainBookList.filter(book => book.id === id)[0];
			this.setState({selectedBook: selectedBook});
		}
	


handleSellingBook= () => {
	console.log(this.state.selectedBook.quantity);
		const booksSold = this.state.selectedBook;
		if ( this.state.selectedBook.quantity !== 0) {
			const quantityToSell = { 
				quantity: (booksSold.quantity -=1)
			};
			this.handleChangingSelectedBook(quantityToSell.id);
		console.log(this.state.selectedBook.quantity);
		} else {
			this.handleChangingSelectedBook(this.state.selectedBook.id);
		}
	};

	
	handleEditingBookList = (bookToEdit) => {
		const editedMainBookList = this.state.mainBookList.filter(book => book.id !==this.state.selectedBook.id).concat(bookToEdit);
		this.setState({
			mainBookList: editedMainBookList,
			editing: false,
			selectedBook: null
		})
	}

	handleEditClick= () => {
		console.log('handleEditClick Reached');
	this.setState({editing: true});
	};



	//Read
	handleClick = () => {
		if (this.state.selectedBook !=null) {
			this.setState ({
				formVisibleOnPage: false,
				selectedBook: null,
				editing: false
		});
		} else {
			this.setState(prevState => ({
				formVisibleOnPage: !prevState.formVisibleOnPage
			}));
		}
	}



		
render() {
  const addButton = {
    backgroundColor: 'transparent',
    fontSize: '20px',
    padding: '10px',
	fontFamily: "Andale Mono",

	};


    
	let currentlyVisibleState = null;
	let buttonText = null; 


  if (this.state.editing){
		currentlyVisibleState = 
		<EditBookForm book={this.state.selectedBook} onEditBook = {this.handleEditingBookList} />
    buttonText = "Return to List";
  }
	else if (this.state.selectedBook !=null)  {
		currentlyVisibleState = 
    <BookDetail 
     book={this.state.selectedBook}
		 onClickingDelete={this.handleDeletingBook}
		 onClickingEdit={this.handleEditClick}
		 onClickingSell={this.handleSellingBook} 
		 />

	buttonText= "Return to List"

	} else if (this.state.formVisibleOnPage) {
		currentlyVisibleState = 
    <NewBookForm
onNewBookCreation={this.handleAddingNewBookToList} />;    
    buttonText = "Return to List";
	}
	else {
		currentlyVisibleState = 
		<BookList
		bookList={this.state.mainBookList}
		onBookSelection = {this.handleChangingSelectedBook} />
		buttonText= "Add New Coffee"
	}
	
	return(
		<React.Fragment>
{currentlyVisibleState}
<br></br>
<button style={addButton} type="button" onClick={this.handleClick}>
	{buttonText}</button>
	<br></br>
	</React.Fragment>
	);
}
}

export default BookControl;