using Commerce.Api.Product.Command;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Commerce.Api.Product;

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

}