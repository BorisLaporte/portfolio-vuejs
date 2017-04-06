// INPUT : OBJECT / ARRAY
// OUTPUT : ARRAY OR FALSE
// SORT THE IMG PATHS AND ADD AN OPTIONAL PREFIX
const sortImgPath = (
  /* The object or array */
  data, 
  /* The optional prefix */
  urlPrefix = "", 
  /* Kinds of variables accepted */
  crawlable = /^(object|array)$/, 
  /* The extensions we want to sort */
  re = /\.(jpe?g|png|svg|gif)$/,
  /* For recursive purpose */
  result = []
  ) => {
  /* Is crawlalbe ? */
  if ( crawlable.test(typeof data) ){
    for ( _el = 0 in data ){
      /* Is crawlalbe ? */
      if ( crawlable.test(typeof data[_el]) ){
        /* Parse deeper */
        result = sortImgPath(data[_el], urlPrefix, crawlable, re, result)

      /* Is a string and has the good ext ? */
      } else if ( typeof data[_el] == "string" && re.test(data[_el]) ) {
        /* Add to result */
        result.push(urlPrefix + data[_el])
      }
    }
    return result
  } else {
    return false
  }
}

export default sortImgPath