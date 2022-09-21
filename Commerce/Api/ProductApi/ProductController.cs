using Commerce.Api.BaseResponses;
using Commerce.Api.ProductApi.Command;
using Commerce.Api.ProductApi.Query;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Commerce.Api.ProductApi;

[ApiController]
[Route("[controller]")]
public class ProductController : ControllerBase
{
    private readonly IMediator _mediator;
    public ProductController(IMediator mediator) => this._mediator = mediator;

    [HttpPost("add")]
    public async Task<IActionResult> Add([FromBody] AddProduct.Request request, CancellationToken cancellationToken)
    {
        return Ok(await _mediator.Send(request, cancellationToken));
    }

    [HttpPost("images")]
    public async Task<IActionResult> UploadImages([FromForm] UploadProductImages.Request request, CancellationToken cancellationToken)
    {
        return Ok(await _mediator.Send(request, cancellationToken));
    }

    [HttpPost("addWithImages")]
    public async Task<IActionResult> AddWithImages([FromForm] AddProductWithImgages.Request request, CancellationToken cancellationToken)
    {
        return Ok(await _mediator.Send(request, cancellationToken));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProductBaseResponse>> GetProduct([FromRoute] int id, CancellationToken cancellationToken)
    {
        return Ok(await _mediator.Send(new GetProduct.Request { ProductId = id }, cancellationToken));
    }

    [HttpGet("/products")]
    public async Task<ActionResult<List<GetProducts.Response>>> GetProducts(CancellationToken cancellationToken)
    {
        return Ok(await _mediator.Send(new GetProducts.Request(), cancellationToken));
    }

}