export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-6 text-balance">
          ¡Compra tus lentes sin salir de casa!
        </h1>
        <p className="text-lg sm:text-xl text-primary-foreground/90 mb-8 text-balance">
          Los mejores estilos y marcas premium directamente a tu puerta
        </p>
        <button className="bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
          Explorar Catálogo
        </button>
      </div>
    </section>
  )
}
