import { Card, Image, Row, Col, Modal, Button } from 'react-bootstrap'
import TinyEventCard from '../../EventCard/TinyEventCard/TinyEventCard'
import NewMessageForm from '../../Forms/NewMessageForm/NewMessageForm'
import { AuthContext } from "../../../context/auth.context"
import { useContext, useState } from "react"
import { MessageContext } from '../../../context/message.context'
import TinyCard from '../TinyCard/TinyCard'
import "../GeneralInfoCard/GeneralInfoCard.css"

const CommonCard = ({ _id, image, username, networks, avatar, images, description, title, likedArtists, likedEvents, likedVenues, role }) => {

    const { user, isLoggedIn } = useContext(AuthContext)
    const { showMessage } = useContext(MessageContext)

    const [showModal, setShowModal] = useState(false)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const fireFinalActions = () => {
        closeModal()
        showMessage('HOLA', 'mensaje enviado!')
    }

    let instagramURL = ""
    let twitterURL = ""

    if (networks) {
        instagramURL = `https://www.instagram.com/${networks.instagram}`
        twitterURL = `https://www.twitter.com/${networks.twitter}`
    }
    else {
        instagramURL = ""
        twitterURL = ""
    }
    return (
        <>
            <Row>
                <Col>
                    {username && <Card.Title className="pageUsername">{username}</Card.Title>}
                </Col>
            </Row>
            <Row className="firstRow">
                <Col md={{ span: 4, offset: 1 }}>
                    {

                        avatar
                            ?
                            <Col md={3}>
                                <Image className="profileImg" src={avatar} alt="Profile Picture" />

                            </Col>
                            :
                            <Col md={3}>
                                <Image className="poster" src={image} alt="Profile Picture" />
                            </Col>

                    }
                </Col>
                <Col md={{ span: 6 }}>

                    {title && <Card.Title className="pageUsername">{title}</Card.Title>}
                    {description && <Card.Text className="description">{description}</Card.Text>}

                </Col>
                <Card.Text>
                    {
                        networks
                        &&
                        <div className="networksLinks">
                            {networks.instagram && <a target="_blank" rel="noreferrer" href={instagramURL}>Instagram </a>}
                            {networks.spotify && <a target="_blank" rel="noreferrer" href={networks.spotify}>Spotify </a>}
                            {networks.soundcloud && <a target="_blank" rel="noreferrer" href={networks.soundcloud}>SoundCloud </a>}
                            {networks.twitter && <a target="_blank" rel="noreferrer" href={twitterURL}>Twitter </a>}
                            {networks.bandcamp && <a target="_blank" rel="noreferrer" href={networks.bandcamp}> BandCamp </a>}

                        </div>
                    }
                </Card.Text>

                {isLoggedIn && (user.role !== 'Fan') && !title && <Button onClick={openModal}>Mandar mensaje a {username}</Button>}

            </Row>

            <>
                {
                    images
                    &&
                    <Row>
                        {
                            Object.entries(images).map(([key, value]) => {
                                return (
                                    <img key={key} className="otherImages" src={value} alt="Other Profile photos" />
                                )
                            })
                        }
                    </Row>
                }
            </>
            {

                likedArtists?.length
                &&
                user._id === _id
                &&
                <>
                    {
                        likedArtists.map((artist, index) => {

                            return (
                                <TinyCard alterRole={role} {...artist} />
                            )
                        })
                    }
                </>
            }

            {
                likedVenues?.length
                &&
                user._id === _id
                &&
                <>
                    {
                        likedVenues.map((venue, index) => {
                            return (
                                <TinyCard alterRole={role} {...venue} />
                            )
                        })
                    }
                </>
            }

            {
                likedEvents?.length
                &&
                user._id === _id
                &&
                <>
                    {
                        likedEvents.map((event, index) => {
                            return (
                                <TinyEventCard {...event} />
                            )
                        })
                    }
                </>
            }


            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Mensaje para {username}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewMessageForm fireFinalActions={fireFinalActions} destinationId={_id} username={username} answer={false} />
                </Modal.Body>
            </Modal>
        </>
    )
}
export default CommonCard