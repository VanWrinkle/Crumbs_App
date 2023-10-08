export function getTimeSince(date: Date) {
    const now = new Date()
    const timeDiff = now.getTime() - date.getTime()

    const minutes = Math.floor(timeDiff / (1000 * 60))
    const hours = Math.floor(timeDiff / (1000 * 60 * 60))
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
    const weeks = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7))
    const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30))

    if (months) {
        return `${months}m ago`
    } else if (weeks) {
        return `${weeks}w ago`
    } else if (days) {
        return `${days}d ago`
    } else if (hours) {
        return `${hours}h ago`
    } else if (minutes) {
        return `${minutes}m ago`
    } else {
        return `now`
    }

}