const useColor = () => {
  const colors = ['bg-stone-600', 'bg-zinc-600', 'bg-gray-700', 'bg-neutral-700']
  const getColor = (index) => colors[index % colors.length]
  return { getColor }
}

export default useColor
