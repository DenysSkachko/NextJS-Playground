import Films from '@/components/blocks/games/Films'
import Stack from '@/components/blocks/games/Stack'
import Tech from '@/components/blocks/games/Tech'

export default function HomePage() {
  return (
    <div className="h-full flex flex-col justify-end">
      <h1 className="text-xl"> <span className="text-accent text-5xl">Добро пожаловать,</span> это мой сайт playground, на нём я тренируюсь, разрабатываю новые фишки, а также тут вы можете узнать побольше обо мне как о человеке</h1>
      <h2 className="p-4 pb-0 text-2xl text-light">technology of this resource:</h2>
      <Stack />
    </div>
  )
}
