import video from './assets/animeMix.mp4';

function Home() {
    document.title = "Anime JAN";
    return(
    <div>
        <video
        autoPlay loop muted
        style={{
            position: "fixed",
            overflow: "hidden",
            top: "50%",
            left: "50%",
            width: "100%",
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