import video from './assets/animeMix.mp4';

function Home() {
    document.title = "Animemuuuu";
    return(
    <div>
        <video
        autoPlay loop muted
        style={{
        position: "absolute",
        width: "100%",
        left: "50%",
        top: "50%",
        height: "100%",
        objectFit: "cover",
        transform: "translate(-50%, -50%)",
        zIndex: "-1"

    }}
    > <source src={video} type="video/mp4" /></video>
    </div>
    );
}
export default Home;