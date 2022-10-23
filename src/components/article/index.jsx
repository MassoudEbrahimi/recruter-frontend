import {motion} from "framer-motion";
import "./article.scss";

const Article = ({dataSource, handleGet}) => {

    const {id, title, img, description} = dataSource;
    const animateProps = {
        initial: {opacity: 0, scale: 0},
        animate: {opacity: 1, scale: 1},
        ended: {opacity: 0, scale: 0},
        transition: {ease: "easeOut", duration: 1}
    }
    const animateImage = {
        ...animateProps,
        transition: {ease: "easeOut", duration: 1.5}
    }
    return (
        <motion.figure {...animateProps} className="article-container" key={id}>
            <motion.img src={img} loading={"lazy"} alt={title} {...animateImage}/>
            <h3>{title}</h3>
            <figcaption className="description">
                <p>{description}</p>
            </figcaption>
        </motion.figure>
    )
}
export default Article;