import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
    Button,
    Tooltip,
    Dialog,
    Input,
    toast,
    Notification,
} from '@/components/ui'
import { FiSettings, FiUpload } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { HiUpload } from 'react-icons/hi'
import httpClient from '@/api/http-client'
import { endpoints } from '@/api/endpoint'

interface ConfigDropdownProps {
    companyName?: string
    companyGroupName?: string
    trackerId: any // New prop to pass the tracker ID
    onRefresh?: () => void
}

const ESIConfigDropdown: React.FC<ConfigDropdownProps> = ({
    companyName,
    companyGroupName,
    trackerId,
    onRefresh,
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const buttonRef = useRef(null)
    const dropdownRef = useRef(null)
    const fileInputRef = useRef<HTMLInputElement>(null) // Added
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                buttonRef.current &&
                !buttonRef.current.contains(event.target) &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleOptionClick = (option) => {
        setSelectedOption(option)
        setIsDialogOpen(true)
        setIsOpen(false)
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // New
        const file = event.target.files?.[0]
        if (file) {
            setSelectedFile(file)
        }
    }

    const handleFileUpload = async () => {
        // Updated
        if (!selectedFile) {
            toast.push(
                <Notification title="Error" closable={true} type="danger">
                    Please select a file to upload
                </Notification>,
            )
            return
        }

        try {
            setLoading(true)
            const formData = new FormData()
            formData.append('document', selectedFile)
            // formData.append('type', "challan");
            console.log(formData)
            await httpClient.put(
                endpoints.esiTracker.uploadDocs(trackerId), // Ensure correct endpoint
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            )

            toast.push(
                <Notification title="Success" type="success">
                    {selectedOption} document uploaded successfully
                </Notification>,
            )
            if (onRefresh) {
                onRefresh()
            }

            setIsDialogOpen(false)
            setSelectedFile(null)
            if (fileInputRef.current) {
                fileInputRef.current.value = '' // Clear file input
            }
        } catch (error) {
            toast.push(
                <Notification title="Error" closable={true} type="danger">
                    {error.response.data.message}
                </Notification>,
            )
            console.error('Upload error:', error)
        } finally {
            setLoading(false)
        }
    }

    const options = [{ key: 'Challan', label: 'Challan Upload' }]

    const updateDropdownPosition = () => {
        if (buttonRef.current && dropdownRef.current) {
            const rect = buttonRef.current.getBoundingClientRect()
            const dropdownWidth = dropdownRef.current.offsetWidth
            dropdownRef.current.style.position = 'fixed'
            dropdownRef.current.style.top = `${rect.bottom + window.scrollY}px`
            dropdownRef.current.style.left = `${rect.left + window.scrollX - dropdownWidth + rect.width}px`
        }
    }

    useEffect(() => {
        if (isOpen) {
            updateDropdownPosition()
            window.addEventListener('scroll', updateDropdownPosition)
            window.addEventListener('resize', updateDropdownPosition)
        }
        return () => {
            window.removeEventListener('scroll', updateDropdownPosition)
            window.removeEventListener('resize', updateDropdownPosition)
        }
    }, [isOpen])

    const openNotification = (
        type: 'uccess' | 'info' | 'danger' | 'warning',
        message: string,
    ) => {
        toast.push(
            <Notification
                title={type.charAt(0).toUpperCase() + type.slice(1)}
                type={type}
            >
                {message}
            </Notification>,
        )
    }

    const handleConfirm = () => {
        setIsDialogOpen(false)
        openNotification('success', 'ESI proof uploaded successfully')
    }

    const handleCancel = () => {
        setIsDialogOpen(false)
    }

    return (
        <>
            <Tooltip title="Click to upload ESI documents">
                <Button
                    ref={buttonRef}
                    icon={<HiUpload />}
                    size="sm"
                    onClick={() => setIsOpen(!isOpen)}
                />
            </Tooltip>
            {isOpen &&
                ReactDOM.createPortal(
                    <div
                        ref={dropdownRef}
                        className="py-2 w-52 bg-white rounded-md shadow-xl mt-2 border border-gray-200 z-50"
                    >
                        {options.map((option) => (
                            <button
                                key={option.key}
                                className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-gray-100 w-full text-left"
                                onClick={() => handleOptionClick(option.key)}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>,
                    document.body,
                )}
            <Dialog isOpen={isDialogOpen}>
                <div className="mb-4">Upload {selectedOption} receipt</div>
                <div className="flex flex-col gap-2">
                    <Input
                        ref={fileInputRef} // Added
                        type="file"
                        onChange={handleFileChange} // Updated
                        className="mb-4"
                        accept=".pdf, .zip, .jpg"
                    />
                </div>
                <div className="mt-6 text-right flex gap-2 justify-end items-center">
                    <Button size="sm" className="mr-2" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button
                        variant="solid"
                        size="sm"
                        onClick={handleFileUpload}
                        disabled={!selectedFile} // Added
                        loading={loading}
                    >
                        Confirm
                    </Button>
                </div>
            </Dialog>
        </>
    )
}

export default ESIConfigDropdown
