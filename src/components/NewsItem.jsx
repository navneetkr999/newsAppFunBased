import React from 'react'

function NewsItem(props) {
  return (
    <div className='my-3'>
      <div className="card">
          <div className="imageContainer">
              <img src={props.imageUrl} className="card-img-top" alt="..." style={{height: '265px'}}/>
          </div>
          <div className='d-flex position-absolute justify-content-end end-0'>
            <span className="badge rounded-pill bg-danger">{props.source}
            </span>
          </div>
          <div className="card-body">
            <h5 className="card-title">{props.title}..</h5>
            <p className="card-text">{props.description}..</p>
            <p className="card-text"><small className='text-muted'>by {props.author} on {props.publishedDate}</small></p>
            <a href={props.newsUrl} target='_blank' rel="noreferrer" className="btn btn-sm btn-secondary">Read More..</a>
          </div>
      </div>
    </div>
  )
}

export default NewsItem
