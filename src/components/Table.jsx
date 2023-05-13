import TableItem from "./TableItem"



const Table = ({items, showItemBtn=true}) => {
  return (
    <div className='table'>
        <table>
            <thead>
                <tr>
                    {
                        ["Name", "Amount", "Date",showItemBtn ? "Product" : "", ""].map((i, index) =>
                        (<th key={index}>{i}</th>))
                    }
                </tr>
            </thead>

            <tbody>
                {
                  items.map((item) => (

                    <tr key={item.id}>
                      
                      <TableItem item={item} showItemBtn = {showItemBtn}/>
                    </tr>
                  ))
                }

            </tbody>
        </table>

    </div>
  )
}

export default Table