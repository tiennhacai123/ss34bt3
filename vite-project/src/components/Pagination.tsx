import React from 'react'

export default function Pagination() {
  return (
    <div>
        <div style={{marginLeft:1100}} className="pagination_rounded">
    <ul>
        <li> <a href="#" className="prev"> 〈<i className="fa fa-angle-left" aria-hidden="true"></i>  </a> </li>
        <li><a href="#">1</a> </li>
        <li className="hidden-xs"><a href="#">2</a> </li>
        <li className="hidden-xs"><a href="#">3</a> </li>
        <li className="hidden-xs"><a href="#">4</a> </li>
        <li className="hidden-xs"><a href="#">5</a> </li>
        <li className="visible-xs"><a href="#">...</a> </li>
        <li><a href="#">6</a> </li>
        <li><a href="#" className="next"> 〉 <i className="fa fa-angle-right" aria-hidden="true"></i></a> </li>
    </ul>
    </div>
    </div>
  )
}
