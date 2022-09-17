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

    [HttpGet("{id}")]
    public async Task<ActionResult<GetProduct.Response>> GetProduct([FromRoute] int productId, CancellationToken cancellationToken)
    {
        return Ok(await _mediator.Send(new GetProduct.Request { ProductId = productId }, cancellationToken));
    }

}