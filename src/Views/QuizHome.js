import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, ButtonToolbar, Col, Container, Navbar, Row, Stack, } from 'react-bootstrap'
import './QuizHome.css'
import { AiFillCheckCircle } from 'react-icons/ai'
import { MdCancel, MdOutlineAssignmentReturned } from 'react-icons/md'

function QuizHome() {

    const [interAct, setinterAct] = useState(true)
    const [current, setcurrent] = useState(0)
    const [ansers, setansers] = useState(0)
    const [quizes, setquizes] = useState([
        {
            title:"What's your name",
            quizeImage:"",
            options:[
                {
                    name:'mahfuz',
                    color:'primary',
                },
                {
                    name:'mahfuz2',
                    color:'success'
                },
                {
                    name:'mahfuz12',
                    color:'danger'
                },
                {
                    name:'mahfu31z',
                    color:'warning'
                },
            ],
            answer:1
        },
        {
            title:"What's your school's name",
            quizeImage:"",
            options:[
                {
                    name:'Harvad',
                    color:'primary',
                },
                {
                    name:'Oxford',
                    color:'success'
                },
                {
                    name:'MIT',
                    color:'danger'
                },
                {
                    name:'NASA',
                    color:'warning'
                },
            ],
            answer:1
        }
    ])


    const [currentSeconds, setcurrentSeconds] = useState(0)
    const [cuntDownTime, setcuntDownTime] = useState(60-currentSeconds)

    const handleQuize = (ans,idx)=> {
        if(!ans||!idx)return;
        setcurrent(current>=quizes.length-1? quizes.length-1:current+1)
        setinterAct(current>=quizes.length-1? false:true)
        if(ans===idx){
            setcuntDownTime(60)
            setansers(ansers+1)
        }
        else{
            setcuntDownTime(60)
        //    return alert('your ans is not correct')
        }
    }
    const handleSkip = () => {
        setcurrent(current>=quizes.length-1? quizes.length-1:current+1)
    }

    useEffect(() => {
        if(cuntDownTime<0){
            setcurrent(current+1)
            setcuntDownTime(60)
        }
        const interval = setInterval(() => {
            setcuntDownTime(cuntDownTime-1)
        }, 1000)
        return () => {  
            clearInterval(interval)
        }
    }, [cuntDownTime])
    



  return (
    <div className='quizBody__container'>
                <div className='quizSelf'>
                <Row className='header__container' >
                    <p>{quizes[current]?.title}<span>?</span> </p>
                </Row>
                <Container className='sticky__footer' >
                    <Stack direction="horizontal" gap={3}>
                        <div style={{fontWeight:'550'}} >1/19</div>
                    </Stack>
                </Container>
                <Container className='body__container'  >
                    <Row style={rowAlign} >
                        <Col className='colo__coontent'  >
                        <ButtonToolbar aria-label="Toolbar with button groups">
                            <div style={durationButtons} >{cuntDownTime}</div>
                        </ButtonToolbar>
                        </Col>
                        <Col xs={9} className='colo__coontent' >
                            <div className="quize__iamge__container" >
                                <img src={quizes[current]?.quizeImage} alt={''} />
                            </div>
                        </Col>
                        <Col className='colo__coontent'  >
                            <ButtonToolbar aria-label="Toolbar with button groups">
                                <Button onClick={handleSkip} style={skipButtons} >Skip</Button>
                            </ButtonToolbar>
                        </Col>
                    </Row>
                </Container>
                <Container >
                    <Row >
                    {
                        quizes[current]?.options.map((option,idx)=>(
                        <Col key={idx} style={optionsGap} >
                            <Button onClick={()=>{
                                if(!interAct)return;
                                handleQuize(quizes[current]?.answer,idx+1)
                            }} style={options} variant={option?.color}>
                                {/* <MdCancel className="animtedSign" /> */}
                                {option.name}
                            </Button>
                        </Col>
                        ))
                    }
                    </Row>
                </Container>
            </div>
    </div>
  )
}

export default QuizHome


const durationButtons = {
    width: '60px',
    height:'60px',
    borderRadius:'100%',
    fontSize:'1.5rem',
    margin:'0px',
    backgroundColor:'gray',
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color:'white',
}
const skipButtons = {
    margin:'0px',
    width: '100px',
    height:'40px',
    backgroundColor: 'red',
}
const rowAlign = {
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
}
const options = {
    display:'flex',
    alignItems: 'center',
    width:'100%',
    height:'65px',
    textAlign:'left',
    fontWeight:'550',
}
const optionsGap = {
    minWidth:'50%',
    padding:'3px'
}