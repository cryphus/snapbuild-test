import { compare } from '../../data/siteContent'
import './Compare.css'

function Compare() {
  return (
    <section className="compare section" id="compare">
      <div className="container">
        <div className="section__header section__header--center">
          <h2>{compare.title}</h2>
          <p className="section__lead">{compare.lead}</p>
        </div>

        <div className="compare__scroll">
          <table className="compare__table">
            <thead>
              <tr>
                <th scope="col">Особенности</th>
                {compare.columns.map((col, i) => (
                  <th scope="col" key={col} className={i === 0 ? 'compare__col-main' : undefined}>
                    {col}
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
      </div>
    </section>
  )
}

export default Compare
