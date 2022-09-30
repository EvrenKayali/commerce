using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;

namespace Commerce.Services;

public interface IStorageService
{
    Task UploadAsync(string name, Stream content, CancellationToken cancellationToken);
    Task UploadAsync(string name, IFormFile content, CancellationToken cancellationToken);
    Task UploadBatchAsync(string? folder, IFormFile[] contents, CancellationToken cancellationToken);
    Task DeleteAsync(string fileName);
    Task DeleteBatchAsync(List<string> fileNames);
    Task<List<BlobItem>> GetDirectory(string folder);
    Task RenameAsync(string newName, string oldName);
}

public class AzureBlobStorageService : IStorageService
{
    private readonly BlobServiceClient _blobServiceClient;
    private readonly BlobContainerClient _blobContainer;

    public AzureBlobStorageService(BlobServiceClient blobServiceClient)
    {
        _blobServiceClient = blobServiceClient;
        _blobContainer = _blobServiceClient.GetBlobContainerClient("products");

    }
    public async Task UploadAsync(string fileName, Stream content, CancellationToken cancellationToken)
    {
        await _blobContainer.CreateIfNotExistsAsync(cancellationToken: cancellationToken);
        var blobClient = _blobContainer.GetBlobClient(fileName);
        await blobClient.UploadAsync(content, true, cancellationToken);
    }

    public async Task UploadAsync(string? folder, IFormFile content, CancellationToken cancellationToken)
    {
        var fileName = string.IsNullOrWhiteSpace(folder) ? content.FileName : $"{folder}/{content.FileName}";
        using var stream = new MemoryStream();
        await content.CopyToAsync(stream, cancellationToken);
        stream.Position = 0;
        await UploadAsync(fileName, stream, cancellationToken);
    }

    public async Task UploadBatchAsync(string? folder, IFormFile[] contents, CancellationToken cancellationToken)
    {
        foreach (var file in contents)
        {
            await UploadAsync(folder, file, cancellationToken);
        }
    }

    public async Task DeleteAsync(string fileName)
    {
        var blob = _blobContainer.GetBlobClient(fileName);
        await blob.DeleteIfExistsAsync();
    }

    public async Task DeleteBatchAsync(List<string> fileNames)
    {
        foreach (var file in fileNames)
        {
            await DeleteAsync(file);
        }
    }

    public async Task<List<BlobItem>> GetDirectory(string folder)
    {
        var results = _blobContainer.GetBlobsAsync(prefix: folder);

        return await results.ToListAsync();
    }

    public async Task RenameAsync(string newName, string oldName)
    {
        var source = _blobContainer.GetBlobClient(oldName);
        var target = _blobContainer.GetBlobClient(newName);
        await target.StartCopyFromUriAsync(source.Uri);
        await source.DeleteIfExistsAsync();
    }
}