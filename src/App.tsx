function App() {
  return (
    <main className="section">
      <div className="container">
        <p className="section__eyebrow">снэпбилд</p>
        <h1>Расширение лендинга снэпбилд</h1>
        <p className="section__lead">
          Секции добавляются по мере реализации плана.
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          <button className="btn btn-primary" type="button">
            Начать сейчас
          </button>
          <button className="btn btn-outline" type="button">
            Подробнее
          </button>
        </div>
      </div>
    </main>
  )
}

export default App
