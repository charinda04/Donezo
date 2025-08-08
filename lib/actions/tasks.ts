'use server'

import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth'
import { prisma } from '../prisma'

export async function createTask(content: string, dueDate?: Date) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      throw new Error('Unauthorized')
    }

    if (!content.trim()) {
      throw new Error('Task content is required')
    }

    const task = await prisma.task.create({
      data: {
        content: content.trim(),
        dueDate: dueDate || null,
        userId: session.user.id,
      },
    })

    revalidatePath('/')
    return { success: true, task }
  } catch (error) {
    console.error('Error creating task:', error)
    return { success: false, error: 'Failed to create task' }
  }
}

export async function updateTask(taskId: string, content: string) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      throw new Error('Unauthorized')
    }

    if (!content.trim()) {
      throw new Error('Task content is required')
    }

    // Verify task belongs to user
    const existingTask = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId: session.user.id,
      },
    })

    if (!existingTask) {
      throw new Error('Task not found')
    }

    const task = await prisma.task.update({
      where: { id: taskId },
      data: {
        content: content.trim(),
      },
    })

    revalidatePath('/')
    return { success: true, task }
  } catch (error) {
    console.error('Error updating task:', error)
    return { success: false, error: 'Failed to update task' }
  }
}

export async function toggleTaskComplete(taskId: string) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      throw new Error('Unauthorized')
    }

    // Verify task belongs to user
    const existingTask = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId: session.user.id,
      },
    })

    if (!existingTask) {
      throw new Error('Task not found')
    }

    const task = await prisma.task.update({
      where: { id: taskId },
      data: {
        completed: !existingTask.completed,
        completedAt: !existingTask.completed ? new Date() : null,
      },
    })

    revalidatePath('/')
    return { success: true, task }
  } catch (error) {
    console.error('Error toggling task completion:', error)
    return { success: false, error: 'Failed to toggle task completion' }
  }
}

export async function deleteTask(taskId: string) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      throw new Error('Unauthorized')
    }

    // Verify task belongs to user
    const existingTask = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId: session.user.id,
      },
    })

    if (!existingTask) {
      throw new Error('Task not found')
    }

    await prisma.task.delete({
      where: { id: taskId },
    })

    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Error deleting task:', error)
    return { success: false, error: 'Failed to delete task' }
  }
}

export async function getTasks(filter: 'all' | 'today' | 'completed' = 'all') {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      throw new Error('Unauthorized')
    }

    const whereClause: Record<string, unknown> = {
      userId: session.user.id,
    }

    // Apply filters
    switch (filter) {
      case 'today':
        const today = new Date()
        today.setHours(23, 59, 59, 999) // End of today
        whereClause.dueDate = {
          lte: today,
        }
        whereClause.completed = false
        break
      case 'completed':
        whereClause.completed = true
        break
      case 'all':
      default:
        // No additional filters for all tasks
        break
    }

    const tasks = await prisma.task.findMany({
      where: whereClause,
      orderBy: [
        { completed: 'asc' }, // Incomplete tasks first
        { createdAt: 'desc' }, // Newest first
      ],
    })

    return { success: true, tasks }
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return { success: false, error: 'Failed to fetch tasks' }
  }
}