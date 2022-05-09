const Card = ({ title, content, styleContent }) => {
    return (
        <div className="h-60 bg-base-100 border border-gray-300 hover:bg-primary hover:text-white">
            <div className="card-body p-5">
                <h2 className="text-xl font-bold">{title}</h2>
                <p className={styleContent+" m-card-content-6 xl:m-card-content-9"}>{content}</p>
            </div>
        </div>
    )
}

export default Card