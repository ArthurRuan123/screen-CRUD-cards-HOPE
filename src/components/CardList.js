import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//material-ui
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
//styles
import '../styles/createCards.css';
import '../styles/cards.css';
import '../styles/global.css';
import '../styles/cardDicas.css';
import '../styles/cardFatos.css';
import '../styles/cardMotivacional.css';
import '../styles/editCards.css';
//icons
import dicasIcon from '../icons/dicasIcon.png';
import fatosIcon from '../icons/fatos.png';
import motivacionalIcon from '../icons/motivacional.png';
import pencilIcon from '../icons/pencil.png';
import trashIcon from '../icons/trash.png';
import wPencilIcon from '../icons/wpencil.png';
import wTrashIcon from '../icons/wtrash.png';
//fetch actions
import { readCardsFetch, addCardFetch, deleteCardFetch, editCardFetch } from '../store/fetchActions';

const useStyles = makeStyles(theme => ({
  formControl: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
    minWidth: 180,
  }
}));

export default function CardList() {
  const classes = useStyles();
  const cards = useSelector(state => state.cards);
  const dispatch = useDispatch();
  //state
  const [CardText, setCardText] = useState(null);
  const [CardType, setCardType] = useState(null);
  const [CardTitle, setCardTitle] = useState(null);
  const [EditCard, setEditCard] = useState(false);
  const [upCard, setUpCard] = useState(null);
  const [UpCardText, setUpCardText] = useState('');
  const [UpCardTitle, setUpCardTitle] = useState('');

  useEffect(() => {
    dispatch(readCardsFetch());
  });

  function createCard() {
    if(CardText != '') {
      const newCard = {
        typeId: CardType,
        text: CardText,
        title: CardTitle
      }

      dispatch(addCardFetch(newCard));

      setCardText('');
      setCardType('');
      setCardTitle('');
    }
  }

  function destroyCard(id) {
    dispatch(deleteCardFetch(id));
  }

  const editarCard = () => {
    upCard.title = UpCardTitle;
    upCard.text = UpCardText;

    dispatch(editCardFetch(upCard));
    
    setEditCard(false);
    setUpCard(null);
    setUpCardText('');
    setUpCardTitle('');
  }

  const editar = (card) => {
    const updateCard = Object.assign({}, card);
    setEditCard(true);
    setUpCard(updateCard);
  }

  return (
    <div className="container">

      <div className="card-container">
  
        <ul>
          { cards.map(card => (
              card.typeId === "dicas" && 
              <li className="dicas" key={card._id}>
                <img src={dicasIcon} />
                <div className="dicas-container">
                  <h1>{card.title}</h1>
                  <p align="justify" >{card.text}</p>
                </div>
                <div className="button-ud">
                  <button onClick={() => editar(card)}>
                    <img src={pencilIcon} />
                  </button>
                  <button onClick={() => destroyCard(card._id)}>
                    <img src={trashIcon} />
                  </button>
                </div>
              </li>
          ))}
          { cards.map(card => (
              card.typeId === "fatos" && 
              <li className="fatos" key={card._id}>
                <img src={fatosIcon} />
                <div className="fatos-container">
                  <h1>Curiosidade</h1>
                  <p>{card.text}</p>
                </div>
                <div className="button-ud">
                  <button onClick={() => editar(card)}>
                    <img src={pencilIcon} />
                  </button>
                  <button onClick={() => destroyCard(card._id)}>
                    <img src={trashIcon} />
                  </button>
                </div>
              </li>
          ))}
          { cards.map(card => (
              card.typeId === "motivacional" && 
              <li className="motivacional" key={card._id}>
                <div className="motivacional-container">
                  <img src={motivacionalIcon} />
                  <p>{card.text}</p>
                </div>
                <div className="button-ud">
                  <button onClick={() => editar(card)}>
                    <img src={wPencilIcon} />
                  </button>
                  <button onClick={() => destroyCard(card._id)}>
                    <img src={wTrashIcon} />
                  </button>
                </div>
              </li>
          ))}
        </ul>

      </div>
      <>
        { 
          EditCard === false &&
        
          <div className="create-container">
            
            <font>Criar Cards</font>

            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="type-card-simple">Tipo</InputLabel>
              <Select
                native
                value={CardType}
                onChange={(e) => setCardType(e.target.value)}
              >
                <option aria-label="None" value="" />
                <option value={'dicas'}>Dicas</option>
                <option value={'fatos'}>Fatos</option>
                <option value={'motivacional'}>Motivacional</option>
              </Select>
            </FormControl>

            {
              (CardType === 'motivacional' || CardType === 'fatos') &&
              <>
                <form>
                  <label htmlFor="textCard">
                    Descrição
                  </label>

                  <textarea 
                    value={CardText}
                    name="text"
                    onChange={(e) => setCardText(e.target.value)}
                  />
                </form>
              </>
            }

            {
              (CardType === 'dicas') &&
              <>
                <form>
                  <label htmlFor="textCard">
                    Título
                  </label>

                  <input 
                    value={CardTitle}
                    onChange={(e) => setCardTitle(e.target.value)}
                  />

                  <label htmlFor="textCard">
                    Descrição
                  </label>

                  <textarea 
                    value={CardText}
                    onChange={(e) => setCardText(e.target.value)}
                  />
                </form>
              </>
            }
            <button type="button" onClick={createCard}>
              NOVO CARD
            </button>
          </div>
        }
        {
          EditCard &&
            <div className="edit-container">
              <font>Editar Cards</font>
            {
              upCard && (upCard.typeId === 'motivacional' || upCard.typeId === 'fatos') &&
                <>
                  <form>
                    <label htmlFor="textCard">
                      Descrição
                    </label>

                    <textarea 
                      value={UpCardText}
                      onChange={(e) => setUpCardText(e.target.value)}
                    />
                  </form>
                </>
            }
            {
              upCard && (upCard.typeId === 'dicas') &&
                <>
                  <form>
                    <label htmlFor="tituloCard">
                      Título
                    </label>

                    <input 
                      value={UpCardTitle}
                      onChange={(e) => setUpCardTitle(e.target.value)}
                    />

                    <label htmlFor="textCard">
                      Descrição
                    </label>

                    <textarea 
                      value={UpCardText}
                      onChange={(e) => setUpCardText(e.target.value)}
                    />
                  </form>
                  
                </>
            }
              <button type="button" onClick={editarCard}>
                EDITAR
              </button>

              <button className="back" type="submit" onClick={() => setEditCard(false)}>
                VOLTAR
              </button>
            </div>
        }

      </>
      
    </div>

  );
}