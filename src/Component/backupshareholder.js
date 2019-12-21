{percentofshare.map((value, index) => (
      value.Particulars!=='Year End' && checkholder.indexOf(value.Particulars) > -1?      
        <td>{value.Particulars.replace("&nbsp;&nbsp;&nbsp;&nbsp;", " ")}</td>  
        <td>                                       
        {Object.keys(percentofshareobject).map(key =>
            key.toString()!=='BOLD' && key.toString()!=='Particulars'?
              <span key={key.toString()}>{value[key]}</span>
            :null
        )}
        </td>
        <td>
        {noofshare.map((value2, index2) => (
            Object.keys(noofshareobject).map(key2 =>
                key2.toString()!=='BOLD' && key2.toString()!=='Particulars' && value.Particulars===value2.Particulars ?
                  <span key={key2.toString()}>{value2[key2]}</span>
                :null
            )
        ))}
        </td>
        <td>
        {noofshareholders.map((value3, index3) => (Object.keys(noofshareholdersobject).map(key3 =>
                key3.toString()!=='BOLD' && key3.toString()!=='Particulars' && value.Particulars===value3.Particulars ?
                  <span key={key3.toString()}>{value3[key3]}</span>
                :null
            )
        ))}   
        </td> 
      :null
    ))}     

All Share Holder 
{allperiodshareholding.map((value, index) => (
value.Particulars!=='Year End'  && checkholder.indexOf(value.Particulars) > -1 ?
<tr key={index}>
  {Object.keys(allperiodshareholdingobject).map(key =>
      key.toString()!=='BOLD' ?
        <td key={key.toString()}>{value[key].replace("&nbsp;&nbsp;&nbsp;&nbsp;", " ")}</td>
      :null
  )}
</tr>
:null
))} 