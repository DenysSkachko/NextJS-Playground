'use client'
import { useEffect, useState } from 'react'

type Commit = {
  sha: string
  commit: {
    message: string
    author: {
      name: string
      date: string
    }
  }
  html_url: string
}

export default function GitCommits() {
  const [commits, setCommits] = useState<Commit[]>([])

  useEffect(() => {
    fetch("https://api.github.com/repos/DenysSkachko/NextJS-Playground/commits")
      .then(res => res.json())
      .then(data => setCommits(data.slice(0, 5)))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="space-y-3">
      {commits.map(commit => (
        <a
          key={commit.sha}
          href={commit.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block border rounded p-3 bg-gray-100 hover:bg-light-hover transition"
        >
          <p className="font-mono text-sm">{commit.commit.message}</p>
          <p className="text-xs text-gray-500">
            {commit.commit.author.name} — {new Date(commit.commit.author.date).toLocaleString()}
          </p>
        </a>
      ))}
    </div>
  )
}
