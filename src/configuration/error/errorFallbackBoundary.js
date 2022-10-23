import "./errorFallbackBoundary.scss";



export const ErrorFallbackBoundary = (props) => {
    const { error, resetErrorBoundary } = props
    return (
        <div role="alert" className="error-boundary-container">
            <div className="error-boundary-inner">
                <p className="title">An error occured</p>
                <div className="error-message">
                    <pre> Message : {error.message}</pre>
                </div>
                <div className="error-message-stacktrace"><pre> StackTrace : {error.stack}</pre></div>
                <button onClick={resetErrorBoundary}>Reset</button>
            </div>
        </div>
    )
}
export  const OnErrorBoundary = (error , info)=>{
    console.log(info.componentStack)
    console.log(`Message = ${error.message} 
    StackTrace = ${error.stack}
    Name= ${error?.name} 
    Cause= ${error?.cause}
    `)
}