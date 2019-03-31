import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var listIdCounter = 1003;
var cardIdCounter = 10;

class BoardContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    header: "Short-term stuff",
                    listId: 1001,
                    cards: [
                        {
                            id: 1, task: "Finish Web Hw", checked: true
                        },
                        {
                            id: 2, task: "Study Newwork Administration", checked: false
                        },
                        {
                            id: 3, task: "Work out", checked: true
                        },
                        {
                            id: 4, task: "Have dinner with Ken", checked: false
                        },
                        {
                            id: 5, task: "Study Macro Economics", checked: false
                        },
                    ]
                },
                {
                    header: "Long-term goal",
                    listId: 1002,
                    cards: [
                        {
                            id: 6, task: "Master RoR", checked: false
                        },
                        {
                            id: 7, task: "Build the next Facebook", checked: true
                        },
                        {
                            id: 8, task: "Finish side project", checked: true
                        },
                        {
                            id: 9, task: "Sleep for 24hrs", checked: false
                        }
                    ]
                }
            ]
        };
    }

    handleAddList(newHeader) {
        var newList = {
            header: newHeader,
            listId: listIdCounter,
            cards: []
        }
        listIdCounter++;
        var newData = this.state.data;
        newData = newData.concat(newList);
        this.setState({ data: newData });
    }

    handleDeleteList(targetListId) {
        var newData = this.state.data;
        var targetListIndex = newData.findIndex(list => {
            return list.listId === targetListId;
        })

        newData.splice(targetListIndex, 1);
        this.setState({ data: newData });
    }

    handleAddCard(newTask, targetListId) {
        var newCard = {
            id: cardIdCounter,
            task: newTask,
            checked: false
        }
        cardIdCounter++;
        var newData = this.state.data;
        var targetListIndex = newData.findIndex(list => {
            return list.listId === targetListId;
        })

        newData[targetListIndex].cards.push(newCard);
        this.setState({ data: newData });
    }

    handleDeleteCard(targetCardId) {
        var newData = this.state.data;

        newData.forEach(listItem => {
            var targetCardIndex = listItem.cards.findIndex(cardItem => {
                return targetCardId === cardItem.id;
            })

            if (targetCardIndex >= 0) {
                listItem.cards.splice(targetCardIndex, 1)
            }

        });

        this.setState({ data: newData });
    }



    handleToggleChecked(targetCardId) {
        var newData = this.state.data;

        newData.forEach(listItem => {
            var targetCardIndex = listItem.cards.findIndex(cardItem => {
                return targetCardId === cardItem.id;
            })

            if (targetCardIndex >= 0) {
                listItem.cards[targetCardIndex].checked = !listItem.cards[targetCardIndex].checked;
            }

        });

        this.setState({ data: newData });

    }

    render() {
        return (
            <div className="board-content" >
                <ListGroup
                    data={this.state.data}
                    handleAddCard={this.handleAddCard.bind(this)}
                    handleToggleChecked={this.handleToggleChecked.bind(this)}
                    handleDeleteCard={this.handleDeleteCard.bind(this)}
                    handleDeleteList={this.handleDeleteList.bind(this)}
                />
                <ListAdderWrap data={this.state.data} handleAddList={this.handleAddList.bind(this)} />
            </div>
        );
    }
}

class ListGroup extends React.Component {
    render() {
        const listGroup = this.props.data.map(listItem => {
            return (
                <ListWrap
                    header={listItem.header}
                    cards={listItem.cards}
                    listId={listItem.listId}
                    key={listItem.listId}
                    handleAddCard={this.props.handleAddCard}
                    handleToggleChecked={this.props.handleToggleChecked}
                    handleDeleteCard={this.props.handleDeleteCard}
                    handleDeleteList={this.props.handleDeleteList}
                />
            )
        }, this);
        return (
            <div className="list-group">
                {listGroup}
            </div>
        )
    }
}

class ListWrap extends React.Component {
    showCardAddBtn() {
        ReactDOM.findDOMNode(this.refs.cardAdder).style.display = "none";
        ReactDOM.findDOMNode(this.refs.addingCard).style.display = "block";
    }

    hideCardAddBtn() {
        ReactDOM.findDOMNode(this.refs.cardAdder).style.display = "block";
        ReactDOM.findDOMNode(this.refs.addingCard).style.display = "none";
    }

    render() {
        var addCard = () => {
            if (ReactDOM.findDOMNode(this.refs.cardInput).value) {
                var newTask = ReactDOM.findDOMNode(this.refs.cardInput).value;
                this.props.handleAddCard(newTask, this.props.listId);
                this.hideCardAddBtn();
                ReactDOM.findDOMNode(this.refs.cardInput).value = "";
            }
        }

        return (
            <div className="list-wrap">
                <div className="list-content">
                    <ListHeader cards={this.props.cards} header={this.props.header} listId={this.props.listId} handleDeleteList={this.props.handleDeleteList} />
                    <ListCard cards={this.props.cards} handleToggleChecked={this.props.handleToggleChecked} handleDeleteCard={this.props.handleDeleteCard} />
                    <a className="card-adder-wrap" onClick={this.showCardAddBtn.bind(this)} ref="cardAdder">Add a card</a>
                    <div className="adding-card" ref="addingCard">
                        <input type="text" className="item-add-input" placeholder="Add a card..." ref="cardInput" />
                        <span className="item-add-btn" onClick={addCard}>Add</span>
                        <span className="item-cancel-btn" onClick={this.hideCardAddBtn.bind(this)} >X</span>
                    </div>
                </div>
            </div>
        )
    }
}

class ListHeader extends React.Component {
    render() {
        var deleteList = () => {
            this.props.handleDeleteList(this.listId);
        }

        var showStatus = () => {
            var uncheckedItems = this.props.cards.filter(cardItem => {
                return !cardItem.checked;
            })
            ReactDOM.findDOMNode(this.refs.status).innerHTML = "Todo: " + uncheckedItems.length;
            ReactDOM.findDOMNode(this.refs.status).style.display = "block";
            ReactDOM.findDOMNode(this.refs.delete).innerHTML = "X";
        }
        var hideStatus = () => {
            ReactDOM.findDOMNode(this.refs.status).style.display = "none";
            ReactDOM.findDOMNode(this.refs.delete).innerHTML = "一";
        }
        return (
            <div className="list-header">
                <div className="status-shown" ref="status" ></div>
                <textarea className="text-area">{this.props.header}</textarea>
                <div className="list-status"
                    ref="delete"
                    onClick={deleteList}
                    onMouseOver={showStatus}
                    onMouseOut={hideStatus}>一</div>
            </div>
        )
    }
}

class ListCard extends React.Component {
    render() {
        const listCard = this.props.cards.map(cardsItem => {
            return (
                <ListMember
                    id={cardsItem.id}
                    task={cardsItem.task}
                    checked={cardsItem.checked}
                    taskId={cardsItem.id}
                    key={cardsItem.id}
                    handleToggleChecked={this.props.handleToggleChecked}
                    handleDeleteCard={this.props.handleDeleteCard}
                />
            )
        }, this);
        return (
            <div className="list-card">
                {listCard}
            </div>
        )
    }
}

class ListMember extends React.Component {
    render() {
        var toggleChecked = () => {
            this.props.handleToggleChecked(this.props.id);
        }
        var deleteCard = () => {
            this.props.handleDeleteCard(this.props.id);
        }
        return (

            <div className="list-member" onClick={toggleChecked}>
                <div className={this.props.checked ? "list-detail checked" : "list-detail"}>
                    {this.props.task}
                </div>
                <div className="list-edit" onClick={deleteCard}>X</div>
            </div>
        );
    }
}

class ListAdderWrap extends React.Component {
    showListAddBtn() {
        // const listAdder = document.querySelector('.list-adder');
        // listAdder.style.display = "none";
        // const addingList = document.querySelector('.adding-list');
        // addingList.style.display = "block";
        // const listAdderWrap = document.querySelector('.list-adder-wrap');
        // listAdderWrap.classList.add("adding");

        ReactDOM.findDOMNode(this.refs.addingList).style.display = "block";
        ReactDOM.findDOMNode(this.refs.listAdder).style.display = "none";
        ReactDOM.findDOMNode(this.refs.listAdderWrap).classList.add("adding");
    }

    hideListAddBtn() {
        ReactDOM.findDOMNode(this.refs.addingList).style.display = "none";
        ReactDOM.findDOMNode(this.refs.listAdder).style.display = "block";
        ReactDOM.findDOMNode(this.refs.listAdderWrap).classList.remove("adding");

    }

    render() {
        var totalTodo = 0;
        this.props.data.forEach(listItem => {
            totalTodo += listItem.cards.length;
        });
        var checkedTodo = 0;
        this.props.data.forEach(listItem => {
            var checkedCard = listItem.cards.filter(cardItem => {
                return cardItem.checked;
            })
            checkedTodo += checkedCard.length;
        });

        var addList = () => {
            if (ReactDOM.findDOMNode(this.refs.listInput).value) {
                var newHeader = ReactDOM.findDOMNode(this.refs.listInput).value;
                this.props.handleAddList(newHeader);
                this.hideListAddBtn();
                console.log("go")
                ReactDOM.findDOMNode(this.refs.listInput).value = "";
            }
        }

        return (
            <div className="list-adder-wrap" ref="listAdderWrap">
                <div className="adding-list" ref="addingList">
                    <input type="text" className="add-input" placeholder="Add a list..." ref="listInput" />
                    <span className="add-btn" onClick={addList}>Save</span>
                    <span className="cancel-btn" onClick={this.hideListAddBtn.bind(this)}>X</span>
                </div>
                <a className="list-adder" onClick={this.showListAddBtn.bind(this)} ref="listAdder">Add a list</a>
                <div className="dashboard">Todo: {totalTodo - checkedTodo}
                    <br />Checked: {checkedTodo}
                </div>
            </div>
        )
    }
}












ReactDOM.render(<BoardContent />, document.getElementById('root'));