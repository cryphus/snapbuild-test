import { compare } from '../../data/siteContent'
import './Compare.css'

function Compare() {
  return (
    <section className="compare" id="compare">
      <div className="compare__header">
        <h2 className="compare__title">{compare.title}</h2>
        <p className="compare__lead">{compare.lead}</p>
      </div>

      <div className="compare__scroll">
        <table className="compare__table">
          <thead>
            <tr>
              <th scope="col">Особенности</th>
              {compare.columns.map((col, i) => (
                <th scope="col" key={col} className={i === 0 ? 'compare__col-main' : undefined}>
                  {i === 0 ? <span className="compare__brand">{col}</span> : col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {compare.rows.map((row) => (
              <tr key={row.feature}>
                <th scope="row">{row.feature}</th>
                {row.values.map((value, i) => (
                  <td key={i} className={i === 0 ? 'compare__col-main' : undefined}>
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Compare
