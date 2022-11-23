import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import UneMedia from '../../assets/icons/a_la_une_media.svg';
import VideoMedia from '../../assets/icons/Video_media.svg';
import {useTheme} from '../../context/themeContext';
import Search from './Search';
import CardsMedia from './CardsMedia';
import LoaderMedia from './LoaderMedia';
import axios from 'axios';

const Media = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0)
  const [initPage, setInitPage] = useState(0)
  // query useState for search
  const [query, setQuery] = useState("")
  // select card useState
  const [select, setSelect] = useState(null)
  // cards data
  const [data, setData] = useState([])
  // Modal
  //const [modal, setModal] = useState(false)
  // Loading : React content loader
  const [loading, setLoading] = useState(true)
  // Position change pagination : Tous, Startup, pme
  const [paginationSelect, setPaginationSelect] = useState("tous")
  const [positionTrie, setPositionTrie] = useState("")

  // theme
  const theme = useTheme();

  // handle for receive data and set in useState
  const handleSetData = (response) => {
    setCurrentPage(response.meta.current_page);
    setTotalPage(response.meta.last_page);
    setItemsPerPage(response.meta.per_page);
    setData(response.data);
  }

  // GET data from API
  const getData = () => {
    let source = "https://bheti-connect.smirltech.com/api/entrevues";
    axios.get(source).then(res => {
      handleSetData(res.data)
    }).catch((error) => console.log(error))
  }

  

  // Change Section of data : Tout et Success stories
  const changeSectionMenu = (position) => {

    let source = "https://bheti-connect.smirltech.com/api/entrevues";

    if (position == "success")
    {
      //let pmeFilter = {filters: [{field: 'type', value: 'pme'}]}

      axios.get(source).then(res => {
        handleSetData(res.data)
      }).catch((error) => console.log(error))

      setPaginationSelect("success")

    }else{
      getData()
      setPaginationSelect("tout")
    }
  }

  // handle menu : tous, startup and PME for CSS
  const handleMenu = (e) => {
    let activeBtn = document.querySelector(".menuSection .active");
    let valid = e.target.tagName.toLowerCase()

    if(!e.target.classList.contains("active") && valid == "li")
    {
      activeBtn.classList.remove("active")
      e.target.classList.add("active")
    }

  }

  // Search data from API
  const searchData = () => {
    // API : Search
    let source = "https://bheti-connect.smirltech.com/api/entrevues/search"
    // Body POST
    let toSend = {
      search: {
        value: `${query}`
    }
    }
    // Get research
    if (query)
    {
      axios.post(source, toSend).then((resp) =>{
        handleSetData(resp.data)
      }).catch((error) => {
        console.log(error);
      })
      setPaginationSelect("query")
    }
  }



  // handle change page
  let changePage = ({selected}) => {
    var pageNumber = selected + 1
    let source = ""
    let request = ""

    if(paginationSelect == "success")
    {
      source = `https://bheti-connect.smirltech.com/api/entrevues?page=${pageNumber}`
      //request = {filters: [{field: 'type', value: 'pme'}]}

    }else if (paginationSelect == "query"){
      source = `https://bheti-connect.smirltech.com/api/entrevues?page=${pageNumber}`
      /*request = {
        "search": {
          "value": `${query}`
      }
      }*/
    }else{

      source = `https://bheti-connect.smirltech.com/api/entrevues?page=${pageNumber}`

    }

    // get Add for another page
   if (request)
    {
      axios.post(source, request).then((resp) =>{
        handleSetData(resp.data)
      }).catch((error) => {
        console.log(error);
      })
    }
    else{
      axios.get(source).then(res => {
        handleSetData(res.data)
      }).catch(error => console.log(error))
    }
  }

  // display items
  let displayItems = data.map((item, index) => {
    return <CardsMedia key={index} item={item} setSelect={setSelect} />
  })

  // First UseEffect
  useEffect(() => {
    const waiting = setTimeout(() => {
      setLoading(false)
    }, 4000);

    getData()
    changeSectionMenu()

    return () => {
      clearTimeout(waiting)
    }
  }, [])

  // UseEffect if currentPage change
  useEffect(() => {
    setLoading(true)
    const waiting = setTimeout(() => {
      setLoading(false)
    }, 4000);

    setInitPage(currentPage - 1)

    return () => {
      clearTimeout(waiting)
    }
  }, [currentPage, query])

  // useEffect of query
  useEffect(() => {
    searchData()
  }, [query])




  return (
    <Container>

        <SectionUne theme={theme}>
          <div className='head-text'>

            <div className='icon-media'>
              <img src={UneMedia} alt="a la une icon" />
            </div>

            <div>
              <h2>A LA UNE...</h2>
              <p>Chaque semaine, découvrez les figures comme les startups qui font bouger les lignes sur les  marchés africains</p>
            </div>
          </div>
          <div className='body-une'>

            <div className='cards-une'>

            <div className='card-1'>1</div>

            <div className='sub-card'>
              <div className='card-2'>2</div>
              <div className='card-3'>3</div>
            </div>

            </div>

            <div className='plus-consulter'>
            <h2>Les plus consultés</h2>

            <div className='item-consult'>
              <a href='#'>P.de Gaétan, PDG Fonds Pierre Castel</a>
              <p>Nelly Chatue-Diop, CEO Ejara, nous partage son parcours entre l'Afrique et l'Europe et revient sur les enjeux de la cryptomonaie.</p>
              <p className='item-date'>15 decembre 2022</p>
            </div>

            <div className='item-consult'>
              <a href='#'>P.de Gaétan, PDG Fonds Pierre Castel</a>
              <p>Nelly Chatue-Diop, CEO Ejara, nous partage son parcours entre l'Afrique et l'Europe et revient sur les enjeux de la cryptomonaie.</p>
              <p className='item-date'>15 decembre 2022</p>
            </div>

            <div className='item-consult'>
              <a href='#'>P.de Gaétan, PDG Fonds Pierre Castel</a>
              <p>Nelly Chatue-Diop, CEO Ejara, nous partage son parcours entre l'Afrique et l'Europe et revient sur les enjeux de la cryptomonaie.</p>
              <p className='item-date'>15 decembre 2022</p>
            </div>

            <div className='item-consult'>
              <a href='#'>P.de Gaétan, PDG Fonds Pierre Castel</a>
              <p>Nelly Chatue-Diop, CEO Ejara, nous partage son parcours entre l'Afrique et l'Europe et revient sur les enjeux de la cryptomonaie.</p>
              <p className='item-date'>15 decembre 2022</p>
            </div>

            <div className='item-consult'>
              <a href='#'>P.de Gaétan, PDG Fonds Pierre Castel</a>
              <p>Nelly Chatue-Diop, CEO Ejara, nous partage son parcours entre l'Afrique et l'Europe et revient sur les enjeux de la cryptomonaie.</p>
              <p className='item-date'>15 decembre 2022</p>
            </div>

            </div>

          </div>


        </SectionUne>

        <SectionEcouteVoir theme={theme}>

          <div className='head-text'>

            <div className='icon-media'>
              <img src={VideoMedia} alt="video icon" />
            </div>

            <div>
              <h2>Ecouter et voir</h2>
              <p>Apprenez de ceux qui analysent le climat des affaires pour piloter et prendre des décisions au quotidien</p>
            </div>
          </div>

          <div className="containerMenu">
                <div className='Box'>

                    {/* Section menu */}
                    <ul className='menuSection' onClick={handleMenu}>
                        {/* tout */}
                        <li className='active' onClick={() => changeSectionMenu("tout")}>Tout</li>
                        {/* success stories */}
                        <li onClick={() => changeSectionMenu("success")}>Les success stories</li>
                    </ul>

                    {/* Filter and search */}
                    <Search setQuery={setQuery} />
                </div>
            </div>

          <AllMedia theme={theme}>

            <AllCards>

            {
              loading ? (<LoaderMedia count={15}/>) : (displayItems)
            }

            </AllCards>

            {/* Pagination */}
            <ReactPaginate
              previousLabel={"Précédent"}
              nextLabel={"Suivant"}
              pageCount={totalPage}
              onPageChange={changePage}
              forcePage={initPage}
              breakLabel="..."
              pageRangeDisplayed={7}
              marginPagesDisplayed={1}
              containerClassName={"containerClassName"}
              pageClassName={"pageClassName"}
              previousLinkClassName={"previousLinkClassName"}
              nextLinkClassName={"nextLinkClassName"}
              disabledClassName={"disabledClassName"}
              activeClassName={"activeClassName"}
              />

          </AllMedia>

          {/*
              modal && <CardModal select={select} setModal={setModal}/>
          */}

        </SectionEcouteVoir>

    </Container>
  )
}


// Style CSS

const AllMedia = styled.div`

.containerClassName {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  justify-content: center;
  align-items:center;
  user-select: none;
  font-size: 13px;
}

.containerClassName li {
  margin: 50px 10px;
}

.pageClassName{
  background-color: ${props => props.theme.colorGrey5};
  border-radius: 50px;
  cursor: pointer;
  padding: 4px 7px;
  transition: .3s ease;


  &:hover{
    background-color: ${props => props.theme.colorBheti};
  }

  a{
    color:white;
  }
}

.previousLinkClassName{
  color: ${props => props.theme.colorBheti};
  padding: 5px;
  font-family: sans-serif;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  &:hover{
    opacity: 0.7;
  }
}

.nextLinkClassName{
  color: ${props => props.theme.colorBheti};
  padding: 5px;
  font-family: sans-serif;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  &:hover{
    opacity: 0.7;
  }
}


.activeClassName{
  background-color: ${props => props.theme.colorBheti};
  color: white;
  border-radius: 50px;
}

.disabledClassName{

}





`;

const AllCards = styled.div`

display: flex;
width: 100%;
justify-content: space-evenly;
flex-wrap: wrap;

`;

const Container = styled.div`



`;

const SectionUne = styled.div`
margin-bottom: 80px;

.head-text {
  display:flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0;

  h2 {
    color: ${props => props.theme.colorBheti};
    margin-bottom: 5px;
  }

  p{
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
  }

  .icon-media {
    margin-right: 30px;

    img{
      height: 70px;
      width: 80px;
    }
  }

}

.body-une {
  display: flex;
  justify-content: center;
  

  .plus-consulter h2 {
    color: ${props => props.theme.colorBheti};
    margin-bottom: 10px;
    font-weight: 600;
    font-family: 'Inter', sans-serif;

  }
  .plus-consulter {
    width: 30%;
    margin-left: 40px;

    .item-consult {
      a{
        text-decoration: underline;
        font-size: 17px;
        
        &:hover{
          color:${props => props.theme.colorBheti};
        }
      }
      p{
        font-size: 14px;
        text-align: justify;
      }

      .item-date {
        text-align: right;
        font-size: 11px;
        margin-top: 10px;
      }
    }
  }

  .cards-une{
    display:flex;
    flex-direction: column;
    


    .card-1 {
      background-color: #700b0b;
      width: 600px;
      height: 238px;
      border-radius: 20px;
    }

    .sub-card {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;

      .card-2{
        background-color: #700b0b;
        width: 48%;
        height: 250px;
        border-radius: 20px;
      }

      .card-3{
        background-color: #700b0b;
        width: 48%;
        height: 250px;
        border-radius: 20px;
      }
    }

  }


}

`;

const SectionEcouteVoir = styled.div`

.head-text {
  display:flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0;

  h2 {
    color: ${props => props.theme.colorBheti};
    margin-bottom: 5px;
  }

  p{
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
  }

  .icon-media {
    margin-right: 30px;

    img{
      height: 70px;
      width: 110px;
    }
  }

}

.menuSection{
    display: flex;
    flex-direction:row;
    list-style: none;
    margin-bottom:-5px;
}

.menuSection li {
  margin-right: 20px;
  padding-bottom: 5px;
  text-transform: uppercase;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 20px;
  font-style: normal;

  &:hover{
    color: ${props => props.theme.colorBheti};
  }

}

.containerMenu{
    margin-top: 30px;
}

.containerMenu .Box{
    display: flex;
    justify-content: space-between;
    align-items:center;
}

.active {
    border-bottom: 2px solid ${props => props.theme.colorBheti};
}

`;

export default Media